let getcsrfValue;

const handleLogin = (e) => {
  e.preventDefault();

  if ($('#user').val() == '' || $('#pass').val() == '') {
    handleError('RAWR! Username or password is empty');
    return false;
  }
    console.log($("input[name=_csrf]").val());
    
    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
    
    return false;
};

const handleSignup = (e) => {
  e.preventDefault();

  if ($('#user').val() == '' || $('#pass').val() == '' || $('#pass2').val() == '') {
    handleError('RAWR! All fields are required');
    return false;
  }
    
    if($("#pass").val() !== $("#pass2").val()){
        handleError("RAWR! Passwords do not match");
        return false;
    }
    
    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
    
    return false;
};

const handleSearch = (e) => {
  e.preventDefault();

  if ($('#word').val() == '') {
    handleError('All fields are required');
    return false;
  }
    
    sendAjax('POST', $("#searchForm").attr("action"), $("#searchForm").serialize(), (data) => {
        console.log(data);
        ReactDOM.render(
        <SearchList csrf={getcsrfValue} search={data.domos} />, document.querySelector('#createContext')
        );
    });
    
    return false;
};

const ChangeContentWindow = (props) => {
    return (
        <div>
        </div>
    );
};


const LoginWindow = (props) => {
    return (
    <form id="loginForm" name='loginForm' onSubmit={handleLogin} action="/login" method='POST' className='mainForm'
        >
        
        <label htmlFor='username'>Username: </label>
        <input id='user' type='text' name='username' placeholder='username' />
        <label htmlFor='pass'>Password: </label>
        <input id='pass' type='password' name='pass' placeholder='password' />
        <input type='hidden' name='_csrf' value={props.csrf} />
        <input className='formSubmit' type='submit' value='Sign in' />
        
        </form>
    );
};

const ExploreList = function(props) {
    if(props.explores.length === 0) {
        return (
        <div className='domoList'>
            <h3 className='emptyDomo'>No Article yet! Lets start your first one here</h3>
            </div>
        )
    };

    const domoNodes = props.explores.map(function(domo) {
        let temp = domo.text.split(/\n/);
        const line = temp.map(function(t) {
            return(
            <div>
                <p className='domoText'>{t}</p>
            </div>
            );
        });
        return (
        <div key={domo._id} className='domo'>
                <img className='domoRelate' src={domo.relate} />
                <div id='g1'>
                <h3 classNAme='domoName'><b>{domo.name}</b></h3>
                    {line}
                </div>
            </div>

        );
    });

    return (
    <div className='domoList'>{domoNodes}</div>
    );
    };


const SignupWindow = (props) => {
    return(
    <form id="signupForm" name='signupForm' onSubmit={handleSignup} action='/signup' method='POST' className='mainForm'>
        
        <label htmlFor='username'>Username: </label>
        <input id='user' type='text' name='username' placeholder='username' />
        <label htmlFor='pass'>Password: </label>
        <input id='pass' type='password' name='pass' placeholder='password' />
        <label htmlFor='pass2'>Password: </label>
        <input id='pass2' type='password' name='pass2' placeholder='retype password' />
        <input type='hidden' name='_csrf' value={props.csrf} />
        <input className='formSubmit' type='submit' value='Sign Up' />
        
        </form>
    );
};

const SearchWindow = (props) => {
    return(
    <form id="searchForm" name='searchForm' onSubmit={handleSearch} action='/searchLogin' method='POST' className='searchForm'>
        
        <label htmlFor='Search'>Search: </label>
        <input id='word' type='text' name='searchTerm' placeholder='SEARCH' />
        <input type='hidden' name='_csrf' value={props.csrf} />
        <input className='searchSubmit' type='submit' value='Search' />
        
        </form>
    );
};

const SearchList = function(props) {
    if(props.search.length === 0) {
        return (
        <div className='searchList'>
            <h3 className='emptySearch'>No Match Article</h3>
            </div>
        )
    };

    const searchNodes = props.search.map(function(search) {
        let temp = search.text.split(/\n/);
        const line = temp.map(function(t) {
            return(
            <div>
                <p className='searchText'>{t}</p>
            </div>
            );
        });
        return (
        <div key={search._id} className='search'>
                <img className='domoRelate' src={search.relate} />
                <div id='g1'>
                <h3 classNAme='domoName'><b>{search.name}</b></h3>
                    {line}
                    </div>
                
            </div>

        );
    });

    return (
    <div className='searchList'>{searchNodes}</div>
    );
    };

const loadExploreFromServer = (csrf) => {
    sendAjax('GET', '/getExplore', null, (data) => {
        console.log(data);
        ReactDOM.render(
            <div><h1>Highlight Of The Day</h1>
        <ExploreList csrf={csrf} explores={data.domos} />
            </div>, document.querySelector('#content')
        );
        ReactDOM.render(
            <ChangeContentWindow csrf={csrf} />,
        document.querySelector('#createContext')
    );
            ReactDOM.render(
    <ChangeContentWindow csrf={csrf} />,
        document.querySelector('#errorMessage')
    );
        
    });
};

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <div><h1>SignIn</h1>
    <LoginWindow csrf={csrf} />
            </div>,
        document.querySelector('#content')
    );
        ReactDOM.render(
    <ChangeContentWindow csrf={csrf} />,
        document.querySelector('#createContext')
    );
                ReactDOM.render(
    <ChangeContentWindow csrf={csrf} />,
        document.querySelector('#errorMessage')
    );
    
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <div><h1>Let's Get Started</h1>
    <SignupWindow csrf={csrf} />
        </div>,
        document.querySelector('#content')
    );
        ReactDOM.render(
    <ChangeContentWindow csrf={csrf} />,
        document.querySelector('#createContext')
    );
                ReactDOM.render(
    <ChangeContentWindow csrf={csrf} />,
        document.querySelector('#errorMessage')
    );
    
};

const createSearchWindow = (csrf) => {
    ReactDOM.render(
    <SearchWindow csrf={csrf} />,
        document.querySelector('#content')
    );
        ReactDOM.render(
    <ChangeContentWindow csrf={csrf} />,
        document.querySelector('#createContext')
    );
    ReactDOM.render(
    <ChangeContentWindow csrf={csrf} />,
        document.querySelector('#errorMessage')
    );
    
};

const setup = (csrf) => {
    
    const loginButton = document.querySelector('#loginButton');

    const signupButton = document.querySelector('#signupButton');
    
    const exploreButton = document.querySelector('#exploreButton');
    
    const searchButton = document.querySelector('#searchButton');
    
    signupButton.addEventListener('click',(e) =>{
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });
    
    loginButton.addEventListener('click',(e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });
    exploreButton.addEventListener('click',(e) => {
        e.preventDefault();
        loadExploreFromServer(csrf);
        return false;
    });
    searchButton.addEventListener('click',(e) => {
        e.preventDefault();
        createSearchWindow(csrf);
        return false;
    });
    
    getcsrfValue = csrf;
    loadExploreFromServer(csrf);
    //createLoginWindow(csrf);
};


const getToken = () => {
    sendAjax('GET','/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});