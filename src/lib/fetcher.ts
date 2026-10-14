export async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    return response.json();
}
