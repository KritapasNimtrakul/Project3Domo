'use strict';

var getcsrfValue = void 0;

var handleLogin = function handleLogin(e) {
    e.preventDefault();

    if ($('#user').val() == '' || $('#pass').val() == '') {
        handleError('RAWR! Username or password is empty');
        return false;
    }
    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

var handleSignup = function handleSignup(e) {
    e.preventDefault();

    if ($('#user').val() == '' || $('#pass').val() == '' || $('#pass2').val() == '') {
        handleError('RAWR! All fields are required');
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("RAWR! Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

var handleSearch = function handleSearch(e) {
    e.preventDefault();

    if ($('#word').val() == '') {
        handleError('All fields are required');
        return false;
    }

    sendAjax('POST', $("#searchForm").attr("action"), $("#searchForm").serialize(), function (data) {
        console.log(data);
        ReactDOM.render(React.createElement(SearchList, { csrf: getcsrfValue, search: data.domos }), document.querySelector('#createContext'));
    });

    return false;
};

var ChangeContentWindow = function ChangeContentWindow(props) {
    return React.createElement('div', null);
};

var LoginWindow = function LoginWindow(props) {
    return React.createElement(
        'form',
        { id: 'loginForm', name: 'loginForm', onSubmit: handleLogin, action: '/login', method: 'POST', className: 'mainForm'
        },
        React.createElement(
            'label',
            { htmlFor: 'username' },
            'Username: '
        ),
        React.createElement('input', { id: 'user', type: 'text', name: 'username', placeholder: 'username' }),
        React.createElement(
            'label',
            { htmlFor: 'pass' },
            'Password: '
        ),
        React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'password' }),
        React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
        React.createElement('input', { className: 'formSubmit', type: 'submit', value: 'Sign in' })
    );
};

var ExploreList = function ExploreList(props) {
    if (props.explores.length === 0) {
        return React.createElement(
            'div',
            { className: 'domoList' },
            React.createElement(
                'h3',
                { className: 'emptyDomo' },
                'No Article yet! Lets start your first one here'
            )
        );
    };

    var domoNodes = props.explores.map(function (domo) {
        var temp = domo.text.split(/\n/);
        var line = temp.map(function (t) {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    { className: 'domoText' },
                    t
                )
            );
        });
        return React.createElement(
            'div',
            { key: domo._id, className: 'domo' },
            React.createElement('img', { className: 'domoRelate', src: domo.relate }),
            React.createElement(
                'div',
                { id: 'g1' },
                React.createElement(
                    'h3',
                    { classNAme: 'domoName' },
                    React.createElement(
                        'b',
                        null,
                        domo.name
                    )
                ),
                line
            )
        );
    });

    return React.createElement(
        'div',
        { className: 'domoList' },
        domoNodes
    );
};

var SignupWindow = function SignupWindow(props) {
    return React.createElement(
        'form',
        { id: 'signupForm', name: 'signupForm', onSubmit: handleSignup, action: '/signup', method: 'POST', className: 'mainForm' },
        React.createElement(
            'label',
            { htmlFor: 'username' },
            'Username: '
        ),
        React.createElement('input', { id: 'user', type: 'text', name: 'username', placeholder: 'username' }),
        React.createElement(
            'label',
            { htmlFor: 'pass' },
            'Password: '
        ),
        React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'password' }),
        React.createElement(
            'label',
            { htmlFor: 'pass2' },
            'Password: '
        ),
        React.createElement('input', { id: 'pass2', type: 'password', name: 'pass2', placeholder: 'retype password' }),
        React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
        React.createElement('input', { className: 'formSubmit', type: 'submit', value: 'Sign Up' })
    );
};

var SearchWindow = function SearchWindow(props) {
    return React.createElement(
        'form',
        { id: 'searchForm', name: 'searchForm', onSubmit: handleSearch, action: '/searchLogin', method: 'POST', className: 'searchForm' },
        React.createElement(
            'label',
            { htmlFor: 'Search' },
            'Search: '
        ),
        React.createElement('input', { id: 'word', type: 'text', name: 'searchTerm', placeholder: 'SEARCH' }),
        React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
        React.createElement('input', { className: 'searchSubmit', type: 'submit', value: 'Search' })
    );
};

var SearchList = function SearchList(props) {
    if (props.search.length === 0) {
        return React.createElement(
            'div',
            { className: 'searchList' },
            React.createElement(
                'h3',
                { className: 'emptySearch' },
                'No Match Article'
            )
        );
    };

    var searchNodes = props.search.map(function (search) {
        var temp = search.text.split(/\n/);
        var line = temp.map(function (t) {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    { className: 'searchText' },
                    t
                )
            );
        });
        return React.createElement(
            'div',
            { key: search._id, className: 'search' },
            React.createElement('img', { className: 'domoRelate', src: search.relate }),
            React.createElement(
                'div',
                { id: 'g1' },
                React.createElement(
                    'h3',
                    { classNAme: 'domoName' },
                    React.createElement(
                        'b',
                        null,
                        search.name
                    )
                ),
                line
            )
        );
    });

    return React.createElement(
        'div',
        { className: 'searchList' },
        searchNodes
    );
};

var loadExploreFromServer = function loadExploreFromServer(csrf) {
    sendAjax('GET', '/getExplore', null, function (data) {
        console.log(data);
        ReactDOM.render(React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Highlight Of The Day'
            ),
            React.createElement(ExploreList, { csrf: csrf, explores: data.domos })
        ), document.querySelector('#content'));
        ReactDOM.render(React.createElement(ChangeContentWindow, { csrf: csrf }), document.querySelector('#createContext'));
        ReactDOM.render(React.createElement(ChangeContentWindow, { csrf: csrf }), document.querySelector('#errorMessage'));
    });
};

var createLoginWindow = function createLoginWindow(csrf) {
    ReactDOM.render(React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'SignIn'
        ),
        React.createElement(LoginWindow, { csrf: csrf })
    ), document.querySelector('#content'));
    ReactDOM.render(React.createElement(ChangeContentWindow, { csrf: csrf }), document.querySelector('#createContext'));
    ReactDOM.render(React.createElement(ChangeContentWindow, { csrf: csrf }), document.querySelector('#errorMessage'));
};

var createSignupWindow = function createSignupWindow(csrf) {
    ReactDOM.render(React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Let\'s Get Started'
        ),
        React.createElement(SignupWindow, { csrf: csrf })
    ), document.querySelector('#content'));
    ReactDOM.render(React.createElement(ChangeContentWindow, { csrf: csrf }), document.querySelector('#createContext'));
    ReactDOM.render(React.createElement(ChangeContentWindow, { csrf: csrf }), document.querySelector('#errorMessage'));
};

var createSearchWindow = function createSearchWindow(csrf) {
    ReactDOM.render(React.createElement(SearchWindow, { csrf: csrf }), document.querySelector('#content'));
    ReactDOM.render(React.createElement(ChangeContentWindow, { csrf: csrf }), document.querySelector('#createContext'));
    ReactDOM.render(React.createElement(ChangeContentWindow, { csrf: csrf }), document.querySelector('#errorMessage'));
};

var setup = function setup(csrf) {

    var loginButton = document.querySelector('#loginButton');

    var signupButton = document.querySelector('#signupButton');

    var exploreButton = document.querySelector('#exploreButton');

    var searchButton = document.querySelector('#searchButton');

    signupButton.addEventListener('click', function (e) {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener('click', function (e) {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });
    exploreButton.addEventListener('click', function (e) {
        e.preventDefault();
        loadExploreFromServer(csrf);
        return false;
    });
    searchButton.addEventListener('click', function (e) {
        e.preventDefault();
        createSearchWindow(csrf);
        return false;
    });

    getcsrfValue = csrf;
    loadExploreFromServer(csrf);
    //createLoginWindow(csrf);
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
'use strict';

var handleError = function handleError(message) {
  $('#errorMessage').text(message);
  $('#domoMessage').animate({ width: 'show' }, 350);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
  $('#domoMessage').animate({ width: 'hide' }, 350);
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
