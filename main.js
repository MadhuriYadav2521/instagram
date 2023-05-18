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
}



function addProduct(event) {
    event.preventDefault();
    // alert("Product adding....")
    var pname = document.getElementById("pname").value;
    var pprofile = document.getElementById("pprofile").value;
    var pimage = document.getElementById("pimage").value;
    var pcaption = document.getElementById("pcaption").value;
    var product = { pname, pprofile, pimage, pcaption};

    var LS = JSON.parse(localStorage.getItem("instagramPosts")) || [];
    LS.push(product);
    localStorage.setItem("instagramPosts", JSON.stringify(LS));

    alert("Product Added Successfully.")
    // document.getElementById("pname").value = "";
    // document.getElementById("pprofile").value = "";
    // document.getElementById("pimage").value = "";
    // document.getElementById("pcaption").value = "";
}
