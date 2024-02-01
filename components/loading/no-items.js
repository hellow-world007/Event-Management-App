export default function EmptyItem({ boldAlert,smallAlert }){
    return (
        <div className="emptyItem">
            <p className="bold">{boldAlert}</p>
            <p className="small">{smallAlert}</p>
        </div>
    )
}