import * as React from "react";

interface ITodoState {
    inputValue: string;
    todos: string[];
}
export default class Todo extends React.Component<any, ITodoState> {
    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: "",
            todos: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    public handleChange(e: any) {
        this.setState({
            inputValue: e.target.value,
        });
    }

    public submit() {
        let { todos } = this.state;
        todos.push(this.state.inputValue);
        this.setState({
            todos,
            inputValue: "",
        });
    }

    public render() {
        return (
            <div>
                <TodoInput inputValue={this.state.inputValue} handleChange={this.handleChange} />
                <a onClick={this.submit}>确定</a>
                {
                    this.state.todos && this.state.todos.map((todo, i) => {
                        return <div key={`${todo}-${i}`}>{todo}</div>;
                    })
                }
            </div>
        );
    }
}

interface ITodoInputProps {
    inputValue: string;
    handleChange: (e: any) => void;
}

class TodoInput extends React.Component<ITodoInputProps, any>{
    public render() {
        return (
            <input onChange={this.props.handleChange} value={this.props.inputValue} />
        );
    }
}
