export default function ProjectNotifications() {
    const notifications = [
        {
            action: 'mentioned you in a comment',
            user: 'Vincent Chen',
            date: '25 min ago',
        },
        {
            action: 'mentioned you in a comment',
            user: 'Vincent Chen',
            date: '25 min ago',
        },
        {
            action: 'mentioned you in a comment',
            user: 'Vincent Chen',
            date: '25 min ago',
        },
    ]
    return (<div className={`relative shadow  bg-white font-Eina03 rounded-[8px] h-full`}>
                <div className="p-[16px] rounded-[8px] bg-white flex">
                     <h3 className="font-bold text-[20px] text-[#222] mb-2">Notifications</h3>
                    <span className="inline-flex items-center justify-center bg-[#FF9C64] 
                    rounded-full w-[36px] h-[36px] ml-auto text-[12px] font-normal text-white">05</span>
                </div>
                <div className="p-[18px] h-full">
                    <div className="overflow-y-auto">
                        {
                            notifications.map((notify, key) => {
                                return (
                                    <div key={key} className="flex border-b py-[12px]">
                                        <p><b>{notify.user}</b> {notify.action}</p>
                                        <span className="text-[#737373] text-[12px] ml-auto">{notify.date}</span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>);
}