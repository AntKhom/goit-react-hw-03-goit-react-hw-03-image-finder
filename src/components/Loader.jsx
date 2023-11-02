import { Dna } from  'react-loader-spinner'

const Loader = () => {
    return <Dna
             visible={true}
             height="200"
             width="200"
             ariaLabel="dna-loading"
             wrapperStyle={{margin: 'auto'}}
             wrapperClass="dna-wrapper"
            />
}

export default Loader