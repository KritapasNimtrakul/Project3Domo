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
        <div>Coming Soon TM</div>
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
              <input id="domoName" type="text" name="name" size="55" placeholder="TITLE"/>
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

const DomoList = function(props) {
    if(props.domos.length === 0) {
        return (
        <div className='domoList'>
            <h3 className='emptyDomo'>No Article yet! Lets start your first one here</h3>
            </div>
        )
    };

    const domoNodes = props.domos.map(function(domo) {
        let temp = domo.text.split(/\n/);
        return (
        <div key={domo._id} className='domo'>
                <h3 classNAme='domoName'><b>{domo.name}</b></h3>
                    <p className='domoText'>{temp}</p>
                <img className='domoRelate' src={domo.relate} />

                <form id='deleteForm' onSubmit={deleteDomo} name='deleteForm' action='/deleteDomo' method='POST' className='deleteForm' >
                <input type='hidden' name='name' value={domo.name} />
                <input type='hidden' name='text' value={domo.text} />

                <input type='hidden' name='_csrf' value={getcsrfValue} />
                <input className='deleteFormSubmit' type='submit' value='Delete' />

                </form>
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
        let temp = domo.text.split(/\n/);
        return (
        <div key={domo._id} className='domo'>
                <h3 classNAme='domoName'><b>{domo.name}</b></h3>
                    <p className='domoText'>{temp}</p>
                <img className='domoRelate' src={domo.relate} />
            </div>

        );
    });

    return (
    <div className='domoList'>{domoNodes}</div>
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
    sendAjax('GET', '/getExplore', null, (data) => {
        console.log(data);
        ReactDOM.render(
        <ExploreList csrf={csrf} explores={data.domos} />, document.querySelector('#createContext')
        );
        
    });
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
    getcsrfValue = csrf;
    loadExploreFromServer(csrf);
    
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