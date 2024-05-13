import './styles.css'

function index({ title, description }) {
    return(
    <div className='item-lst'>
        <strong>{title}</strong>
        <p>{description}</p>
        <hr />
    </div>
        )
    }
    export default index
