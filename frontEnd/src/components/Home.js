const Home = (props) => {

    const { t } = props

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-6'>
                    
                        <p  style={{ paddingTop: '100px', fontFamily: 'Arial, sans-serif', fontSize: '20px', lineHeight: '1.6', textAlign: 'justify' }}>
                            {t("Welcome")}</p>
                        <p  style={{  fontFamily: 'Arial, sans-serif', fontSize: '20px', lineHeight: '1.6', textAlign: 'justify' }}>
                            {t("comprehensive")} </p>
                        <p  style={{  fontFamily: 'Arial, sans-serif', fontSize: '20px', lineHeight: '1.6', textAlign: 'justify' }}>
                            {t("empower")}</p>
                        <p  style={{  fontFamily: 'Arial, sans-serif', fontSize: '20px', lineHeight: '1.6', textAlign: 'justify' }}>
                            {t("Join")}  </p>
                
                </div>
                <div className='col-md-4' >
                    <img  src="https://i.pinimg.com/originals/27/89/cc/2789ccbf0017d761112078a3ade3bba1.jpg"
                        alt="village app" style={{ paddingTop: '100px',width: "600px", height: "600px" }} />
                </div>
            </div>
        </div>

    )
}

export default Home