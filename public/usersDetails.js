document.addEventListener("alpine:init", () => {
    Alpine.data("whichSlope", () => {
        return {
            version: "api-1.0",

            users_data: [],
            email: "",
            first_name: "",
            last_name: "",
            occupation: "",
            numbers: "",
            addresss: "",
            FOS : 0,
            soil : "",
            rainfall: "",
            waterTable: "",
            recommendation: "",
            password_hash: "",
            brief: "",
            message: "",
            comment: "",
            depth: 0,
            strain: 0,
            moisture: 0,
            plastic: 0,
            liquid: 0,
            index: 0,
            output: 0,
            auth: false,

           
            init() {
                const currentUser = localStorage.getItem('user');
                const user = JSON.parse(currentUser);
                if(user) { 
                    this.auth = true;
                } else {
                    console.log('Please login');
                    // window.location.href = "./results.html";
                   const userEmail = prompt('Email');
                   const userPassword = prompt('Password');
                   axios.post("/api/details/login",{
                    email: userEmail,
                    password_hash: userPassword,
                   }).then(res=>{
                    if (res.data.status === "Log-in-successful") {
                        this.first_name = res.data.loginResult.first_name;
                        this.first_name = res.data.loginResult.first_name;
                        
                        localStorage.setItem('user',JSON.stringify(
                            {
                                email: userEmail,
                                password_hash: userPassword,
                            }
                          
                        ))
                        console.log(this.first_name);
                    }
                   })
            

                }
                
                return axios.get("/api/details").then((result) => {
                    this.users_data = result.data.users_info;
                });
            },

            async login() {
                try {
                    const response = await axios.post("/api/details/login", {
                        email: this.email,
                        password_hash: this.password_hash,
                    });

                    if (response.data.status === "Log-in-successful") {
                        alert("Login successful");
                        localStorage.setItem('user',JSON.stringify(
                            {
                                email: this.email,
                                password_hash: this.password_hash,
                            }
                        ))
                        window.location.href = "./home-page.html";
                    } else if (response.data.status === "Login-failed") {
                        alert("Login failed. Please check your credentials.");
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                    // Handle errors here, e.g., display an error message to the user.
                }
            },
            

            recommend() {
                axios.post('/api/recomm', {
                  FOS: this.FOS,
                  soil: this.soil,
                  rainfall: this.rainfall,
                  waterTable: this.waterTable
                })
                .then(result => {
                  this.recommendation = result.data.recommendation;
                })
                .catch(error => {
                  console.error(error);
                });
              },
            

            update() {
                axios.post('/api/details/updateUser', {

                        email: this.email,
                        first_name: this.first_name,
                        last_name: this.last_name,
                        occupation: this.occupation,
                        numbers: this.numbers,
                        addresss: this.addresss,
                        password_hash: this.password_hash,
                   
                })
                    .then((result) => {
                     
                        if (result.data.status === 'successfully updated') {
                            alert('update successful');

                            window.location.href = './profile.html';
                            
                        } else if (result.data.status !== 'successfully updated') {
                            alert('Update not successful. Please retry.');
                        }

                    })
                    .catch((error) => {
                        console.error('An error occurred:', error);
                    });
            },

            addUser() {
                axios
                    .post("/api/details/create", {
                        email: this.email,
                        first_name: this.first_name,
                        last_name: this.last_name,
                        occupation: this.occupation,
                        numbers: this.numbers,
                        addresss: this.addresss,
                        password_hash: this.password_hash,
                    })
                    .then((result) => {
                        if (result.data.status === 'successfully submitted') {
                            // Redirect to a different page
                            window.location.href = "./index.html"; 
                        } else {
                            this.message = alert(result.data.status);
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            },

            aim() {
                axios
                    .post("/api/details/aim", {
                        brief: this.brief,
                        last_name: this.last_name,
                    })
                    .then((result) => {
                        if (result.data.status === 'successfully submitted') {
                            // Redirect to a different page
                            window.location.href = 'https://flask-u8oc.onrender.com'; 
                        } else {
                            this.message = alert(result.data.status);
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            },


            userComment() {
                axios
                    .post("/api/details/UserComments", {
                        comment: this.comment,
                        last_name: this.last_name,
                    })
                    .then((result) => {

                        this.message = alert(result.data.status);
                  
                       
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                     
                    });
            },

           
        
            del() {
                axios
                    .post("/api/details/deleteUser", {
                        email: this.email,
                    })
                    .then((response) => {
                        this.users_info = response.data.users_info;
                        console.log(this.users_info);
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            },
        };
    });
});
