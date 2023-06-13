function register(event) {
    event.preventDefault();
    var name = document.getElementById("userName").value
    var email = document.getElementById("userEmail").value
    var password = document.getElementById("userPassword").value
    var confirmPassword = document.getElementById("userConfirmPassword").value
    // console.log(name,"name here");
    // console.log(email,"email here");
    // console.log(password,"password here");
    // console.log(confirmPassword,"confirmPassword here");

    if (name && email && password && confirmPassword) {
        if (password.length >= 8 && confirmPassword.length >= 8) {
            if (password == confirmPassword) {

                var LS = JSON.parse(localStorage.getItem("instagramUsers")) || []

                var flagForEmail = false;
                for (var i = 0; i < LS.length; i++) {
                    if (LS[i].useremail == email) {
                        flagForEmail = true;
                    }
                }
                if (!flagForEmail) {
                    var data = {
                        namee: name,
                        useremail: email,
                        password: password,
                        confirmPassword: confirmPassword
                    }
                    LS.push(data);
                    localStorage.setItem("instagramUsers", JSON.stringify(LS));
                    alert("registration successful")
                    window.location.href = "./login.html"
                    document.getElementById("userName").value = "";
                    document.getElementById("userEmail").value = "";
                    document.getElementById("userPassword").value = "";
                    document.getElementById("userConfirmPassword").value = "";

                } else {
                    alert("email already exist");
                }

            } else {
                alert("password not matched");
            }
        } else {
            alert("password should be 8 or more digit");
        }
    } else {
        alert("fill all the fields");
    }

}


function login(event) {
    event.preventDefault();
    var email = document.getElementById("userEmail").value
    var password = document.getElementById("userPassword").value
    var currentUser;
    if (email && password) {
        var flag = false;
        var LS = JSON.parse(localStorage.getItem("instagramUsers"));
        for (var i = 0; i < LS.length; i++) {
            if (LS[i].useremail == email && LS[i].password == password) {
                flag = true;
                currentUser = LS[i];
            }
        }
        if (flag == true) {
            localStorage.setItem("instagramCurrentUser", JSON.stringify(currentUser))
            alert("login successful")
            window.location.href = "./index.html";
        } else {
            alert("credentials not matched")
        }
    } else {
        alert("fill all the fields");
    }

}

function logout() {
    alert("We will miss you..")
    localStorage.removeItem("instagramCurrentUser");
    window.location.reload();
    window.location.href = "./signup.html"
}



function addPost(event) {
    event.preventDefault();
    // alert("Product adding....")
    var pname = document.getElementById("pname").value;
    var pprofile = document.getElementById("pprofile").value;
    var pimage = document.getElementById("pimage").value;
    var pcaption = document.getElementById("pcaption").value;
    var product = { pname, pprofile, pimage, pcaption };

    var LS = JSON.parse(localStorage.getItem("instagramPosts")) || [];
    LS.push(product);
    localStorage.setItem("instagramPosts", JSON.stringify(LS));

    alert("Post Added Successfully.")
    document.getElementById("pname").value = "";
    document.getElementById("pprofile").value = "";
    document.getElementById("pimage").value = "";
    document.getElementById("pcaption").value = "";
}


function addStory(event) {
    event.preventDefault();
    // alert("Product adding....")
    var pname = document.getElementById("pname").value;
    var pimage = document.getElementById("pimage").value;
    var product = { pname, pimage };

    var LS = JSON.parse(localStorage.getItem("instagramStories")) || [];
    LS.push(product);
    localStorage.setItem("instagramStories", JSON.stringify(LS));

    alert("Story Added Successfully.")
    document.getElementById("pname").value = "";
    document.getElementById("pprofile").value = "";
    document.getElementById("pimage").value = "";
    document.getElementById("pcaption").value = "";
}

function createProfile(event) {
    event.preventDefault();
    // alert("Product adding....")
    var userData = JSON.parse(localStorage.getItem("instagramUsers"))
    var currentUser = JSON.parse(localStorage.getItem("instagramCurrentUser"))
    var pSubname = document.getElementById("pSubname").value;
    var pimage = document.getElementById("pimage").value;
    var bio = document.getElementById("bio").value;
    var uProfile = { pSubname, pimage, bio };

    for (var i = 0; i < userData.length; i++) {
        if (currentUser.useremail == userData[i].useremail) {
            if (userData[i].userBio === undefined) {
                userData[i].userBio = "";
            }
            else {
                userData[i].userBio = uProfile;
            }
        }
    }
    localStorage.setItem("instagramUsers", JSON.stringify(userData));

    alert("Profile updated")
    window.location.href = './profile.html'
    profileSubname = document.getElementById("pSubname").value = "";
    profileImage = document.getElementById("pimage").value = "";
    ProfileBio = document.getElementById("bio").value = "";
}

function addProfilePost(event) {
    event.preventDefault();
    // alert("Product adding....")
    var pEmail = document.getElementById("forPostUserEmail").value;
    var pimage = document.getElementById("pimage").value;
    var pcaption = document.getElementById("pcaption").value;
    var product = { pimage, pcaption, pEmail };

    var LS = JSON.parse(localStorage.getItem("instagramProfilePosts")) || [];
    LS.push(product);
    localStorage.setItem("instagramProfilePosts", JSON.stringify(LS));

    alert("Post Added Successfully.")
    window.location.href = "./profile.html"
    // document.getElementById("pname").value = "";
    document.getElementById("forPostUserEmail").value = "";
    document.getElementById("pimage").value = "";
    document.getElementById("pcaption").value = "";
}


function search_user() {

    var LS = JSON.parse(localStorage.getItem("instagramUsers"))
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    var divForList = document.getElementsByClassName("searchResult");
    var showRes = document.getElementById("show")


    var listOfUsers = []

    for (var i = 0; i < LS.length; i++) {

        if (LS[i].namee.toLowerCase().includes(input)) {
            listOfUsers += `
            <div class="searchResWrapper" onclick='redirectToProfile(${JSON.stringify(LS[i])})'>
            <div class="divImg">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1c5g9z2f5eeGclAD7dyMVYbdvvk68utTPog&usqp=CAU"/>
            </div>
            <span class="searchResult">${LS[i].namee}</span>
            </div>
            `

        }

    }
    divForList = listOfUsers;
    showRes.innerHTML = divForList;
    // document.write(divForList);
    console.log(divForList);
}
function redirectToProfile(profile) {
    var singleProfile = JSON.stringify(profile);
    // console.log(s, " s here")
    // alert("Working")
    localStorage.setItem("currentProfile", singleProfile);
    window.location.href = './currentProfile.html'
    console.log(singleProfile);
}

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

function follow() {
    var userData = JSON.parse(localStorage.getItem("instagramUsers"))
    var userDataforfollwing = JSON.parse(localStorage.getItem("instagramUsers"))
    var othersProfile = JSON.parse(localStorage.getItem("currentProfile"))
    var currentUser = JSON.parse(localStorage.getItem("instagramCurrentUser"))
    var folloerCount = 0;
    var followingCount = 0;
    for (var i = 0; i < userData.length; i++) {
        if (othersProfile.useremail == userData[i].useremail) {
            if (userData[i].followers === undefined) {
                userData[i].followers = 0;
            }
            else {
                folloerCount++

                userData[i].followers = folloerCount;
                console.log(folloerCount,"folloerCount");
            }
        }
    }
    for (var i = 0; i < userDataforfollwing.length; i++) {
        if (currentUser.useremail == userDataforfollwing[i].useremail) {
            if (userDataforfollwing[i].following === undefined) {
                userDataforfollwing[i].following = 0;
            }
            else {
                followingCount++

                userDataforfollwing[i].following = followingCount;
            }
        }
    }
    localStorage.setItem("instagramUsers", JSON.stringify(userData));
    localStorage.setItem("instagramUsers", JSON.stringify(userDataforfollwing));

    alert("followed")
    window.location.reload();

}

