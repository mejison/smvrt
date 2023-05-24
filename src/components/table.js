export default function Table({ fields, data }) {
    return (<div className="w-full font-Eina03 table-auto overflow-hidden rounded-t-[6px]">
            <table className="w-full">
                <thead className="">
                    <tr className="bg-[#405D80] text-white text-[14px] font-bold p-[16px]">
                        {
                            fields.map((field, index) => {
                                return (
                                    <th className="p-[16px] text-left cursor-pointer" key={index}>{field.label}</th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, indexRow) => {
                            return (
                                <tr key={indexRow}>
                                    {
                                        fields.map((field, indexCol) => {
                                            return (<td key={indexRow+indexCol} className={`p-[16px] bg-white border-b text-[14px] ${field.class}`}>{item[field.field]}</td>);
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>);
}