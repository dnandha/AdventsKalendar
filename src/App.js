import './App.css';
import React from "react";


const backend = window.location.href.replace(":3000", ":3333");
//console.log(backend);

class Numba extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: props.day,
            number: undefined,
            isSolved: false,
        }
    }

    handleChange(event) {
        const code = event.target.value;
        this.setState({number: code});
        fetch(`${backend}testCode?day=${this.state.day}&code=${code}`)
            .then(r => {
                if (r.status === 200) {
                    this.setState({isSolved: true});
                    fetch(`${backend}setSolved`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({day: this.state.day})
                    })
                        .then(r => r.text())
                        .then(text => {
                            //console.log(text);
                        })
                }
            });
    }

    componentDidMount() {
        fetch(`${backend}getSolved?day=${this.state.day}`)
            .then(r => r.json())
            .then(r => {
                //console.log(this.state.day, r.solved);
                this.setState({isSolved: r.solved});
            });
    }

    render() {
        return (
            this.state.isSolved
                ?
                <div className={"col col-3 border"} style={{padding: 20, height: "7em"}}></div>
                :
                <div className={"col col-3 border bg-light"} style={{padding: 20, height: "7em"}}>
                    <h4>{this.state.day}</h4>
                    <input className={"form-control"} type="text" pattern="[0-9]*" onInput={this.handleChange.bind(this)} value={this.state.number}/>
                    <p>{(this.state.number && this.state.number.length === 6) ? (this.state.isSolved ? "Korrekt" : "Falsch") : ""}</p>
                </div>
        )
    }
}

function CalGrid() {
    const days = [ 4, 13,  8,  6, 19, 18, 12,  1, 23,  2, 22, 10,  9, 21, 14, 24, 15,
        11, 17, 20,  7, 16,  3,  5];

    return (
        <div className="row flex-fill text-center">
            {days.map(day =>
                <Numba day={day}/>
            )}
        </div>
    )
    //doors.push(</div>);
}

function App() {
    return (
        <div className={"App"}>
            <h6 style={{marginTop: 10}}>Code im richtigen Textfeld eingeben</h6>
            <div className={"container-fluid d-flex flex-column"} style={{
                backgroundImage: "url(https://media.cntraveler.com/photos/560bf079d518609f2b3b8915/master/pass/harry-potter-christmas-cr-everett.jpg)",
            }}>
                <CalGrid/>
            </div>
        </div>
    );
}

export default App;
