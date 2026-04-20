const runQuery = async (sql) => {

    const url = "./dbConnector.php";

    const postQuery = async (querySql) => {
        const response = await fetch(url, {
            method: "POST",
            cache: "no-store",
            body: new URLSearchParams({
                query: querySql
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }

        const contentType = response.headers.get("content-type") || "";
        const rawBody = await response.text();

        if (!contentType.includes("application/json")) {
            throw new Error(`Expected JSON but got: ${rawBody.slice(0, 120)}`);
        }

        return JSON.parse(rawBody);
    };

    const maybeRewriteUnknownColumns = (errorMessage, originalSql) => {
        const msg = String(errorMessage || "");
        const msgLower = msg.toLowerCase();
        if (!msgLower.includes("unknown column")) return null;

        let rewritten = originalSql;

        // Pick direction based on what's missing.
        if (msg.includes("'s.Status'") || msg.includes("`s`.`Status`") || msg.includes("Status'")) {
            rewritten = rewritten.replaceAll("s.Status", "s.ConservationStatus");
            rewritten = rewritten.replaceAll("Species.Status", "Species.ConservationStatus");
        }

        if (msg.includes("'s.ConservationStatus'") || msg.includes("`s`.`ConservationStatus`") || msgLower.includes("conservationstatus")) {
            rewritten = rewritten.replaceAll("s.ConservationStatus", "s.Status");
            rewritten = rewritten.replaceAll("Species.ConservationStatus", "Species.Status");
        }

        if (msg.includes("'s.Name'") || msg.includes("`s`.`Name`") || msg.includes("Name'")) {
            rewritten = rewritten.replaceAll("s.Name", "s.CommonName");
            rewritten = rewritten.replaceAll("Species.Name", "Species.CommonName");
        }

        if (msg.includes("'s.CommonName'") || msg.includes("`s`.`CommonName`") || msgLower.includes("commonname")) {
            rewritten = rewritten.replaceAll("s.CommonName", "s.Name");
            rewritten = rewritten.replaceAll("Species.CommonName", "Species.Name");
        }

        return rewritten !== originalSql ? rewritten : null;
    };

    try {
        const first = await postQuery(sql);
        if (!first?.error) return first;

        const rewrittenSql = maybeRewriteUnknownColumns(first.error, sql);
        if (!rewrittenSql) return first;

        const second = await postQuery(rewrittenSql);
        // If it succeeds, include the SQL actually used for debugging.
        if (second?.success) return { ...second, _sqlUsed: rewrittenSql };
        return second;
    } catch (error) {
        console.error(error.message);
        return { error: error.message };
    }

}
