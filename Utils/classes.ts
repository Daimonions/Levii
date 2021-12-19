const { userSchema } = require("../Schemas/user")

class Todo {
    index: number;
    name: string;
    description: string;

    constructor(Index: number, title: string, Description?: string){
        this.index = Index;
        this.name = title;
        this.description = Description || "No description provided!";
    }

    async delete(target: string) {
        let guy = await userSchema.findOne({_user: target})
        let entry = guy.todo.findIndex((element: { index: number; }) => element.index == this.index);
        guy.todo.slice(entry, entry + 1)
        await guy.updateOne({$set:{"todo": guy.todo}})
    }

    async update(target: string, data: {title?: string, desc?: string}) {
        if(data.title) this.name = data.title;
        if(data.desc) this.description = data.desc;
        let guy = await userSchema.findOne({_user: target})
        let entry = guy.todo.findIndex((element: { index: number; }) => element.index == this.index);
        guy.todo.splice(entry, 1,)
        await guy.updateOne({$set:{"todo": guy.todo}})
    }
}
export { Todo }
