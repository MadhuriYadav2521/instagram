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
    window.location.href="./signup.html"
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
    // var pname = document.getElementById("pname").value;
    // var pprofile = document.getElementById("pprofile").value;
    var pimage = document.getElementById("pimage").value;
    // var pcaption = document.getElementById("pcaption").value;
    var product = { pimage };

    var LS = JSON.parse(localStorage.getItem("instagramProfilePosts")) || [];
    LS.push(product);
    localStorage.setItem("instagramProfilePosts", JSON.stringify(LS));

    alert("Post Added Successfully.")
    window.location.href="./profile.html"
    // document.getElementById("pname").value = "";
    // document.getElementById("pprofile").value = "";
    document.getElementById("pimage").value = "";
    // document.getElementById("pcaption").value = "";
}

function search_user(){

    var LS = JSON.parse(localStorage.getItem("instagramUsers"))
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    var divForList = document.getElementsByClassName("searchResult");
    var showRes = document.getElementById("show")

    
    var listOfUsers = []
    for (var i = 0; i < LS.length; i++) {
        if (LS[i].namee.toLowerCase().includes(input)) {
            listOfUsers += `<div class="divImg">
            <img src="data:image/jpeg;base64,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"/></div>
            <li class="searchResult">${LS[i].namee}</li>
            <span>Follow</span>`

        }
        
    }
   
    divForList = listOfUsers;
    showRes.innerHTML = divForList;
    // document.write(divForList);
    console.log(divForList);


}

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
  
  function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }
