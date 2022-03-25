function Exit(props) {
    return (
        <button className="c-quit d-flex justify-content-center align-items-center"
        onClick={props.onClick}>
            X
        </button>
    );
}

function TextFormatter(props) {
    if (props.id === "about-gui") {
        return (<AboutFormat />);
    } else if (props.id === "exp-gui") {
        return (<ExpFormat />);
    } else {
        return (<ProjFormat />);
    }
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.value,
            title: props.name,
        }
    }

    handleClick() {
        ReactDOM.unmountComponentAtNode(document.querySelector(".react-root"));
    }

    renderExit() {
        return (
            <Exit onClick={() => this.handleClick()} />
        );
    }

    render() {
        return (
            <div className="win-gui-menu" id={this.state.id + "-menu"}>
                <img src="./img/menu_icon.png"/>
                <div className="c-win-title d-flex justify-content-center align-items-center">
                    <p id="console-title">{this.state.title}</p>
                </div>
                <div className="c-minimize d-flex justify-content-center align-items-center">
                    <div className="dash"></div>
                </div>
                {this.renderExit()}
            </div>
        );
    }
}

class GUIBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.value,
        }
    }

    render() {
        return (
            <div className="c-body">
                <TextFormatter id={this.state.id} />
            </div>
        );
    }
}

class GUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.name,
        }
    }

    render() {
        return (
            <div className="win-gui" id={this.state.id}>
                <Menu value={this.state.id} name={this.state.title} />
                <GUIBody value={this.state.id} />
            </div>
        );
    }
}

/* adding event listeners to each nav item to create separate windows */

document.querySelector("a.about-btn").addEventListener("click",
    function() {
        ReactDOM.render(
            <GUI id="about-gui" name="About Me.md"/>,
            document.querySelector(".react-root")
        );
        dragElement(document.getElementById("about-gui"));
    }
);

document.querySelector("a.exp-btn").addEventListener("click",
    function() {
        ReactDOM.render(
            <GUI id="exp-gui" name="Experience.pdf"/>,
            document.querySelector(".react-root")
        );
        dragElement(document.getElementById("exp-gui"));
    }
);

document.querySelector("a.proj-btn").addEventListener("click",
    function() {
        ReactDOM.render(
            <GUI id="proj-gui" name="Projects.cpp"/>,
            document.querySelector(".react-root")
        );
        dragElement(document.getElementById("proj-gui"));
    }
);

// Make the DIV elements draggable by the menu:
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "-menu")) {
    // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "-menu").onmousedown = dragMouseDown;
    } else {
    // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        elmnt.style.marginTop = 0;
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function AboutFormat() {
    return (
        <div className="c-body-text-container">
            <div className="about-profile">
                <img className="profile-image" src="https://pbs.twimg.com/profile_images/1210650599374622723/VIE3DEhx_400x400.jpg" />
            </div>
            <div className="about-profile">
                <h3 className="profile-header">ABOUT ME</h3>
            </div>
            <div className="about-text row justify-content-center align-items-start">

                    <div className="col-sm-6 about-g">
                        <p className="gui-body-text">
                            Thanks for visiting my portfolio! My name is Axel
                            and I am currently a sophomore studying for a
                            BS in Computer Science at Texas A&M University at
                            College Station.
                        </p>
                        <p className="gui-body-text">
                            I am originally from Paris, France but moved to
                            Texas with my family when I was 3 and have lived
                            here ever since. To stay fit, I love to
                            snowboard in the winter and windsurf in the
                            summer. My favorite Football team is the
                            Dallas Cowboys.
                        </p>
                    </div>
                    <div className="col-sm-6 about-g">
                        <p className="gui-body-text">
                            On the weekends I love:
                        </p>
                        <ul>
                            <li>Working on personal coding projects</li>
                            <li>Going to the gym</li>
                            <li>Playing video games (I'm a huge fan of FPS games)</li>
                            <li>Hanging out with friends and family</li>
                        </ul>
                    </div>
            </div>
        </div>
    );
}


function ExpFormat() {
    return (
        <div className="c-body-text-container">
            <div className="about-text">
                <p className="gui-body-text">
                </p>
            </div>
        </div>
    );
}

function ProjFormat() {
    return (
        <div className="c-body-text-container">
            <div className="about-text">
                <p className="gui-body-text">
                </p>
            </div>
        </div>
    );
}
