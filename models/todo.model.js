module.exports = mongoose => {
    const Todo = mongoose.model(
        "todo",
        mongoose.Schema(
            {
                title: String,
                description: String,
                completed: Boolean,
                userId: String
            },
            {timestamps: true}
        )
    );
    return Todo;
};