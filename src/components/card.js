export default function Card(props) {
    const { children } = props;
    return (<div className="relative p-[24px] shadow rounded-[8px] bg-white">
            {children}
    </div>);
}