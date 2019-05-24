(function () {
    const search = document.getElementById("search");
    const profile = document.getElementById("profile");

    const url = "https://api.github.com/users";
    const client_id = "";
    const client_secret = "";
    const sort = "created: asc"

    async function getUser(user) {
        const profileResponse = await fetch(
            `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
        );

        const reposResponse = await fetch(
            `${url}/${user}/repos?sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
        );

        const profile = await profileResponse.json();
        const repos = await reposResponse.json();

        return { profile, repos };
    }

    function showProfile(user) {
        profile.innerHTML = `<div class="row mt-3">
                    <div class="col-md-4">
                         <div class="card mb-3" style="width:18em;">
                              <img class="card-img-top" src="${user.avatar_url}">
                              <ul class="list-group list-group-flush">
                                   <li class="list-group-item font-weight-bold"><i class="fas fa-folder text-secondary"></i> Repositórios: <span class="badge">${user.public_repos}</span></li>
                                   <li class="list-group-item font-weight-bold"><i class="fas fa-users text-secondary"></i> Seguidores: <span class="badge">${user.followers}</span></li>
                                   <li class="list-group-item font-weight-bold"><i class="fas fa-user-friends text-secondary"></i> Seguindo: <span class="badge">${user.following}</span></li>
                              </ul>
                              <div class="card-body">
                                   <a href="${user.html_url}" target="_blank" class="btn btn-warning btn-block">Ver Perfil</a>
                              </div>
                         </div>
                    </div>
                    <div class="col-md-8">
                         <div id="repos"></div>
                    </div>
               </div>`;
    }

    function showRepos(repos) {
        let output = '';

        repos.forEach(repo => {
            output += `<div class="card card-body mb-2">
                    <div class="row">
                         <div class="col-md-6">
                              <a href="${repo.html_url}" class="font-weight-bold" target="_blank">${repo.name}</a>
                         </div>
                         <div class="col-md-6">
                              <span class="badge"><i class="fas fa-star text-warning"></i> Stars: ${repo.stargazers_count}</span>
                              <span class="badge"><i class="fas fa-eye text-primary"></i> Watch: ${repo.watchers_count}</span>
                              <span class="badge"><i class="fas fa-code-branch text-success"></i> Forks: ${repo.forks_count}</span>
                         </div>
                    </div>
               </div>`
        });

        document.getElementById("repos").innerHTML = output;
    }

    search.addEventListener("keyup", (e) => {
        const user = e.target.value;

        if (user.length > 0) {
            getUser(user).then(res => {
                showProfile(res.profile);
                showRepos(res.repos);
            });
        }
    })
})();