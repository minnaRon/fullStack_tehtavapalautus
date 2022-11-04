import { connect } from "react-redux"
import { addFilter } from "../reducers/filterReducer"

const Filter = (props) => {
    const handleChange = (event) => {
        props.addFilter(event.target.value)
    }

    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapDispatchToProps = {addFilter}

  export default connect(null, mapDispatchToProps)(Filter)
