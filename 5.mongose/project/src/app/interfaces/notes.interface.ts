export interface INotes {
    title: String,
    content: String,
    category: "personal" | "work" | "study" | "other",
    pinned: Boolean,
    tags: {
        label: string,
        colorr: string
    }
}