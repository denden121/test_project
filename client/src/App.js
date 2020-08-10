import React from 'react';
import './App.css';
import Table from "./Components/Table/Table";
import ModelWindowSave from './Components/ModelWindows/ModelWindowSave/ModelWindowSave'
import ModelWindowCreate from "./Components/ModelWindows/ModelWindowCreate/ModelWindowCreate";

class App extends React.Component{
    state = {
        persons:[],
        select_person:''
    }

    onClickButtonAddWorker= () =>{
        document.querySelector('.model-background').style.display = 'flex';
        document.querySelector('.model-window-create').style.display = 'flex'
    }
    onClickCreateWorker=()=>{
        const name = document.querySelector('#name-create').value;
        const surname = document.querySelector('#surname-create').value;
        console.log(name,surname);
        console.log('selector',document.querySelector('.model-background'))
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("name", name);
        urlencoded.append("surname", surname);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/persons/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let temp = [...this.state.persons];
                temp.push(result);
                // console.log('temp',temp)
                this.setState({persons:temp});
            })
            .catch(error => console.log('error', error));
        document.querySelector('.model-window-create').style.display = 'none'
        document.querySelector('.model-background').style.display = 'none'

    }
    onClickDeleteWorker = (index,id) =>{
        console.log('delete',index,id)
        let requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };
        fetch(`http://localhost:3000/persons/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                let temp = [...this.state.persons]
                console.log('temp',temp)
                temp.splice(index,1)
                console.log('temp_post',temp)
                this.setState({persons:temp})
            })
            .catch(error => console.log('error', error));
    }
    onClickButtonEdit = (index,id) =>{
        document.querySelector('.model-background').style.display = 'flex';
        document.querySelector('.model-window-edit').style.display = 'flex';
        let temp = this.state.persons[index];
        console.log('temp',temp)
        document.querySelector('#name-save').value = temp.name;
        document.querySelector('#surname-save').value = temp.surname;
        this.setState({select_person:{index:index,id:id}})
    }
    onClickEditWorker=()=>{
        const newName = document.querySelector('#name-save').value
        const newSurname = document.querySelector('#surname-save').value
        const id = this.state.select_person.id
        const index = this.state.select_person.index
        const lastName = this.state.persons[index].name
        const lastSurname = this.state.persons[index].surname
        if(newName !== lastName | newSurname !== lastSurname){
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            let urlencoded = new URLSearchParams();
            urlencoded.append("name", newName);
            urlencoded.append("surname", newSurname);

            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch(`http://localhost:3000/persons/${id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    let temp = [...this.state.persons]
                    temp[index].name = newName;
                    temp[index].surname = newSurname;
                    this.setState({persons:temp})
                })
                .catch(error => console.log('error', error));
        }
        document.querySelector('.model-background').style.display = 'none';
        document.querySelector('.model-window-edit').style.display = 'none';
        // document.querySelector('.model-background').style.display = 'flex';
        // console.log(newName,newSurname)
        // console.log(lastName,lastSurname)
    }
    loadPersons= async ()=>{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        await fetch("http://localhost:3000/persons/", requestOptions)
            .then(response => response.json())
            .then(result => this.setState({persons:result}))
            .catch(error => console.log('error', error));
    }
    componentDidMount() {
        this.loadPersons();
    }

    render() {
        return (
            <div className='App'>
                <Table onClickDeleteWorker={this.onClickDeleteWorker}
                       persons={this.state.persons}
                       onClickButtonEdit = {this.onClickButtonEdit} />
            <button onClick={this.onClickButtonAddWorker} className={'btn-add'}>Добавить сотрудника</button>

            <div className="model-background">
                <div className="model-window model-window-edit">
                <ModelWindowSave onClickButtonEdit={this.onClickEditWorker} />
            </div>
            <div className="model-window model-window-create">
                <ModelWindowCreate onClickCreateWorker={this.onClickCreateWorker}/>
            </div>
            </div>
        </div>
    );
    }
}

export default App;
