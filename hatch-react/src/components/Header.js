
function Header(props) {
    return (
      <><nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="/">Hatch</a>
        </div>
      </nav>
      <header className="bg-dark py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">{props.title}</h1>
              <p className="lead fw-normal text-white-50 mb-0">{props.desc}</p>
            </div>
          </div>
        </header></>
    )
  }

  export default Header;