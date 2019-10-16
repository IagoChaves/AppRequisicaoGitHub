import api from './api';


class App{
    constructor(){
        this.repositories = [];

        this.formEL = document.getElementById("repo-form");
        this.inputel = document.querySelector('input');
        this.listEl = document.getElementById("repo-list");
        this.registerHandlers();
    }
    registerHandlers(){
        this.formEL.onsubmit = event => this.addRepository(event)
            
        
    }

    setLoading(loading = true){
        if(loading){
            let loadingEl = document.createElement('p');
            loadingEl.setAttribute('id','load');
            loadingEl.appendChild(document.createTextNode('Carregando'))
            loadingEl.style.color = "#00BFFF";
            this.listEl.appendChild(loadingEl);
        }
    }

    async addRepository(event){
        event.preventDefault();
        
        const repoInput = this.inputel.value;
        this.inputel.value="";
        if(repoInput.length === 0){
            return;
        }else{

            this.setLoading();
            try{

            const response = await api.get(`/users/${repoInput}/repos`);
            
          
            response.data.forEach(repo =>{
            
            const {name,description,html_url, owner:{avatar_url}} = repo;

        this.repositories.push({
            name,
            description,
            avatar_url,
            html_url,
        });
    });
        this.render();
    }catch(err){

        alert('Usuário inexistente');
        this.listEl.innerHTML="";
    }
    }
    this.setLoading(false);
}

    render(){
        this.listEl.innerHTML ="";
    
        this.repositories.forEach(repo => {
            let img = document.createElement('img');
            img.setAttribute('src',repo.avatar_url);

            let title = document.createElement('strong');
            title.appendChild(document.createTextNode(repo.name));

            let descriptionel = document.createElement('p');
            descriptionel.appendChild(document.createTextNode(repo.description));

            let link = document.createElement('a');
            link.setAttribute('target','_blank');
            link.setAttribute('href', repo.html_url);
            link.appendChild(document.createTextNode('Acessar'));

            let listElement = document.createElement('li');
            listElement.appendChild(img);
            listElement.appendChild(title);
            listElement.appendChild(descriptionel);
            listElement.appendChild(link);

            this.listEl.appendChild(listElement);
        });
        this.repositories.length = 0; 
    }
    
   
}

new App();