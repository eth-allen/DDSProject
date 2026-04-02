const runQuery = async (sql) => {

    const url = "../dbConnector.php";

    try {

        const response = await fetch(url, {
            method: "POST",
            body: new URLSearchParams({
                query: sql
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

    } catch (error) {
        console.error(error.message);
        return { error: error.message };
    }

}
