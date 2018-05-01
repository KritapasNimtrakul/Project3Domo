let getcsrfValue;

const handleSubmit = (e) => {
    e.preventDefault();
    
    $('#domoMessage').animate({width:'hide'},350);
    
    if($('#domoName').val() == '' || $('#domoText').val() == '') {
        handleError('RAWR! All fields are required');
        return false;
    }
    
    sendAjax('POST', $('#postForm').attr('action'), $('#postForm').serialize(), function(){
        loadDomosFromServer($('#postForm')[0][3].value);
    });
    return false;
};

const handlePasswordChange = (e) => {
  e.preventDefault();

  if ($('#pass').val() == '' || $('#newPass').val() == '' || $('#newPass2').val() == '') {
    handleError('Password is empty');
    return false;
  }
    console.log($("input[name=_csrf]").val());
    
    sendAjax('POST', $("#changeForm").attr("action"), $("#changeForm").serialize(), redirect);
    
    return false;
};

const ChangePassWindow = (props) => {
    return (
        <form id="changeForm" name='changeForm' onSubmit={handlePasswordChange} action="/changePass" method='POST' className='mainForm' >
        
        <label htmlFor='oldPass'>Current Password: </label>
        <input id='pass' type='password' name='pass' placeholder='password' />
        <label htmlFor='newPass'>New Password: </label>
        <input id='newPass' type='password' name='newPass' placeholder='new password' />
        <label htmlFor='newPass2'>Retype New Password: </label>
        <input id='newPass2' type='password' name='newPass2' placeholder='retype new password' />
        <input type='hidden' name='_csrf' value={props.csrf} />
        <input className='formSubmit' id='changePassid' type='submit' value='Change Password' />
        
        </form>
    );
};

const UpgradeWindow = (props) => {
    return (
        <div>
        <h1>Benefits: </h1>
            <ul>
                <li>Appear in the front page of our website more often</li>
                <li>Have access to custom CSS modification/ Available Template</li>
                <li>Higher chance of appearing at the top of our search query</li>
                <li>Ability to favorite and support other writer</li>
                <li>Ability to collab works with other writer</li>
                <li>Gain credit to purchase stuff in our website</li>
                
            </ul>
        </div>
    );
};

const ChangeContentWindow = (props) => {
    return (
        <div>
        </div>
    );
};

const createChangePassWindow = (csrf) => {
    ReactDOM.render(
    <ChangePassWindow csrf={csrf} />,
        document.querySelector('#createCSS')
    );
    ReactDOM.render(
    <ChangeContentWindow csrf={csrf} />,
        document.querySelector('#createContext')
    );
    
};

const UpgradePassWindow = (csrf) => {
    ReactDOM.render(
    <UpgradeWindow csrf={csrf} />,
        document.querySelector('#createCSS')
    );
    ReactDOM.render(
    <ChangeContentWindow csrf={csrf} />,
        document.querySelector('#createContext')
    );
    
};


const createPersonalWindow = (csrf) => {
    ReactDOM.render(
    <DomoForm csrf={csrf} title='Title' content='Story . . .' imgSrc='' />, document.querySelector('#createCSS')
    );
    
};

const handleDomo = (e) => {
    e.preventDefault();
    
    console.log($('#postForm').serialize())
    
    $('#domoMessage').animate({width:'hide'},350);
    
    if($('#domoName').val() == '' || $('#domoText').val() == '') {
        handleError('RAWR! All fields are required');
        return false;
    }
    
    sendAjax('POST', $('#postForm').attr('action'), $('#postForm').serialize(), function(){
        loadDomosFromServer($('#postForm')[0][3].value);
        
    });
    return false;
};


const DomoForm = (props) => {
    return (
        <div>
            <form id='postForm' onSubmit={handleDomo} name='postForm' action='/maker' method='POST' className='postForm' >
              <input id="domoName" type="text" name="name" size="55" placeholder="New Story"/>
        <div>    
        <textarea id="domoText" rows="25" cols="104" maxlength="500" name="text" placeholder="Story Time"></textarea>
            </div>
                <div>
                    <input id='domoRelate' type='text' name='relate' placeholder='ImageURL' value={props.imgSrc} onChange={updateImg} />
                    <input id='domoImg' type='image' placeholder='Relate' 
                        src={props.imgSrc}/>
                    </div>
                <input type='hidden' name='_csrf' value={props.csrf} />
                <input className='makeDomoSubmit' type='submit' value='Publish' />
                </form>
        </div>
        
    );
};

const updateImg = (e) => {
        ReactDOM.render(
    <DomoForm csrf={getcsrfValue} title='Title' content='Story . . .' imgSrc={e.target.value}/>, document.querySelector('#createCSS')
    );  
}

const deleteDomo = (e) => {
    console.log(e.target.name.value);
    //console.log($('#deleteForm')[0][1].value);
    //console.log('name='+e.target.name.value+'&text='+e.target.text.value+'&_csrf='+e.target._csrf.value);
    e.preventDefault();
    sendAjax('POST', $('#deleteForm').attr('action'),'name='+e.target.name.value+'&text='+e.target.text.value+'&_csrf='+e.target._csrf.value, function(){
        loadDomosFromServer($('#deleteForm')[0][1].value);
    });
    
    return false;
};

const readDomo = (e) => {
  e.preventDefault();
    
    sendAjax('POST', $("#readForm").attr("action"), 'name='+e.target.name.value+'&text='+e.target.text.value+'&_csrf='+e.target._csrf.value, (data) => {
        console.log(data);
        ReactDOM.render(
        <ReadList csrf={getcsrfValue} search={data.domos} />, document.querySelector('#createCSS')
        );
            ReactDOM.render(
    <ChangeContentWindow csrf={getcsrfValue} />,
        document.querySelector('#createContext')
    );
    });
    
    return false;
};

const DomoList = function(props) {
    if(props.domos.length === 0) {
        return (
        <div className='domoList'>
            <h3 className='emptyDomo'>No Article yet! Lets start your first one here</h3>
            </div>
        )
    };

    const domoNodes = props.domos.map(function(domo) {
        domo.text = domo.text.substring(0,50);
        console.dir(domo.text);
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
                

                <form id='deleteForm' onSubmit={deleteDomo} name='deleteForm' action='/deleteDomo' method='POST' className='deleteForm' >
                <input type='hidden' name='name' value={domo.name} />
                <input type='hidden' name='text' value={domo.text} />

                <input type='hidden' name='_csrf' value={getcsrfValue} />
                <input className='deleteFormSubmit' type='submit' value='Delete' />

                </form>
                    </div>
            </div>

        );
    });

    return (
    <div className='domoList'>{domoNodes}</div>
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
        domo.text = domo.text.substring(0,50);
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
                <form id='readForm' onSubmit={readDomo} name='readForm' action='/readLogin' method='POST' className='readForm' >
                <input type='hidden' name='name' value={domo.name} />
                <input type='hidden' name='text' value={domo.text} />

                <input type='hidden' name='_csrf' value={getcsrfValue} />
                <input className='readFormSubmit' type='submit' value='Read More . . . ' />

                </form>
                </div>
                
            </div>

        );
    });

    return (
    <div className='domoList'>{domoNodes}</div>
    );
    };

const ReadList = function(props) {
    if(props.search.length === 0) {
        return (
        <div className='searchList'>
            <h3 className='emptySearch'>No Match Article</h3>
            </div>
        )
    };

    const readNodes = props.search.map(function(read) {
        let temp = read.text.split(/\n/);
        const line = temp.map(function(t) {
            return(
            <div>
                <p className='readText'>{t}</p>
            </div>
            );
        });
        return (
        <div key={read._id} className='read'>
                <img className='readRelate' src={read.relate} />
                <div id='g1'>
                <h3 className='readName'><b>{read.name}</b></h3>
                    
                    {line}
                    </div>
                
            </div>

        );
    });

    return (
    <div className='ReadList'>{readNodes}</div>
    );
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

const SearchWindow = (props) => {
    return(
    <form id="searchForm" name='searchForm' onSubmit={handleSearch} action='/search' method='POST' className='searchForm'>
        
        <label htmlFor='Search'>Search: </label>
        <input id='word' type='text' name='searchTerm' placeholder='SEARCH' />
        <input type='hidden' name='_csrf' value={props.csrf} />
        <input className='searchSubmit' type='submit' value='Search' />
        
        </form>
    );
};


const loadDomosFromServer = (csrf) => {
    sendAjax('GET', '/getDomos', null, (data) => {
        
        ReactDOM.render(
        <DomoList csrf={csrf} domos={data.domos} />, document.querySelector('#createContext')
        );
    });
};

const loadExploreFromServer = (csrf) => {
    sendAjax('GET', '/loginExplore', null, (data) => {
        console.log(data);
        ReactDOM.render(
        <ExploreList csrf={csrf} explores={data.domos} />, document.querySelector('#createContext')
        );
        ReactDOM.render(
    <ChangeContentWindow csrf={csrf} />,
        document.querySelector('#createCss')
    );
        
    });
};

const createSearchWindow = (csrf) => {
    ReactDOM.render(
    <SearchWindow csrf={csrf} />,
        document.querySelector('#createCss')
    );
    ReactDOM.render(
    <ChangeContentWindow csrf={csrf} />,
        document.querySelector('#createContext')
    );
    
};

const setup = function(csrf) {
    const changePassButton = document.querySelector('#changeButton');
    
        changePassButton.addEventListener('click',(e) => {
        e.preventDefault();
        createChangePassWindow(csrf);
        return false;
    });
    const UpgradeButton = document.querySelector('#premiumButton');
    
        UpgradeButton.addEventListener('click',(e) => {
        e.preventDefault();
        UpgradePassWindow(csrf);
        return false;
    });
    const changePersonalButton = document.querySelector('#personalButton');
    
        changePersonalButton.addEventListener('click',(e) => {
        e.preventDefault();
        createPersonalWindow(csrf);
        loadDomosFromServer(csrf);
        return false;
    });
    
    const exploreButton = document.querySelector('#exploreButton');
    exploreButton.addEventListener('click',(e) => {
        e.preventDefault();
        loadExploreFromServer(csrf);
        return false;
    });
    
    const searchButton = document.querySelector('#searchButton');
    searchButton.addEventListener('click',(e) => {
        e.preventDefault();
        createSearchWindow(csrf);
        return false;
    });
    
    getcsrfValue = csrf;
    loadExploreFromServer(csrf);
    createSearchWindow(csrf);
    
};


const getToken = () => {
    sendAjax('GET','/getToken',null, (result) => {
        setup(result.csrfToken);
        console.log('setup'+result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});