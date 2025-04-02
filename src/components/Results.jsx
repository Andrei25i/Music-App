import SongCard from './SongCard';

const Results = ({ results, children, ...props }) => {
    return (
        <>
            <div className="results-list shadow" {...props}>
                {children}
                {
                    results.map((item) => (
                        <SongCard item={item} key={item.id}/>
                    ))
                }
            </div>
        </>
  )
}

export default Results;