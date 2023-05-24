export default function Tabs(props) {
    const { tabs, active, change, className } = props
    return (<div className={`flex text-[#404040] ${className}`}>
        {
            tabs.map(function(tab, index) {
                return (<a href="#" key={index} onClick={() => change(tab)} className={`mr-6 ${active.slug == tab.slug ? 'border-b-[#4ECFE0]' : 'border-b-[#E5E5E5]'} border-b-[6px] p-3`}>
                    {tab.label} 
                </a>)
            })
        }
        </div>);
}