import Button from "@/components/button";
import Card from "@/components/card";
import DashboardOverview from "@/components/dashboard-overview";
import IconNewProjectBtnSVG from "@/assets/new-project-btn.svg"
import IconSortBySVG from "@/assets/sort-by.svg"

export default function Dashboard() {
    return (<div className="lg:pl-[270px] pl-0 pt-[90px] pr-[15px]">
                <h3 className="font-Eina03 text-[#222] text-[20px] font-bold mb-4">Good morning, Alex</h3>
                <div className="mb-5">
                    <DashboardOverview />
                </div>
                <Card>
                    <div className="flex items-center">
                        <h3 className="font-Eina03 text-[#222] text-[20px] font-bold">Active Projects</h3>
                        <div className="flex ml-auto items-center">
                            <div className="mr-2">
                                <Button label="New project" icon={IconNewProjectBtnSVG} className="px-4 py-1 text-[12px] bg-[#1860CC]" />
                            </div>
                            <div className="mr-2">
                                <Button label="Sort By" icon={IconSortBySVG} className="px-4 py-[7px] text-[12px] bg-white !text-[#222] border-2 border-[#B8C2CC]" />
                            </div>
                            <a href="#" className="ml-3 inline-block">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.15385 1H2.53846C1.68879 1 1 1.68879 1 2.53846V7.15385C1 8.00352 1.68879 8.69231 2.53846 8.69231H7.15385C8.00352 8.69231 8.69231 8.00352 8.69231 7.15385V2.53846C8.69231 1.68879 8.00352 1 7.15385 1Z" stroke="#4BA3F5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M19.4624 1H14.8471C13.9974 1 13.3086 1.68879 13.3086 2.53846V7.15385C13.3086 8.00352 13.9974 8.69231 14.8471 8.69231H19.4624C20.3121 8.69231 21.0009 8.00352 21.0009 7.15385V2.53846C21.0009 1.68879 20.3121 1 19.4624 1Z" stroke="#4BA3F5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7.15385 13.3079H2.53846C1.68879 13.3079 1 13.9967 1 14.8463V19.4617C1 20.3114 1.68879 21.0002 2.53846 21.0002H7.15385C8.00352 21.0002 8.69231 20.3114 8.69231 19.4617V14.8463C8.69231 13.9967 8.00352 13.3079 7.15385 13.3079Z" stroke="#4BA3F5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M19.4624 13.3079H14.8471C13.9974 13.3079 13.3086 13.9967 13.3086 14.8463V19.4617C13.3086 20.3114 13.9974 21.0002 14.8471 21.0002H19.4624C20.3121 21.0002 21.0009 20.3114 21.0009 19.4617V14.8463C21.0009 13.9967 20.3121 13.3079 19.4624 13.3079Z" stroke="#4BA3F5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                            <a href="#" className="ml-3 inline-block">
                                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.76923 2.84608C2.19407 2.84608 2.53846 2.50168 2.53846 2.07685C2.53846 1.65201 2.19407 1.30762 1.76923 1.30762C1.3444 1.30762 1 1.65201 1 2.07685C1 2.50168 1.3444 2.84608 1.76923 2.84608Z" stroke="#B8C2CC" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7.1543 2.07666H21.0004" stroke="#B8C2CC" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M1.76923 9.76917C2.19407 9.76917 2.53846 9.42478 2.53846 8.99994C2.53846 8.57511 2.19407 8.23071 1.76923 8.23071C1.3444 8.23071 1 8.57511 1 8.99994C1 9.42478 1.3444 9.76917 1.76923 9.76917Z" stroke="#B8C2CC" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7.1543 8.99976H21.0004" stroke="#B8C2CC" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M1.76923 16.6923C2.19407 16.6923 2.53846 16.3479 2.53846 15.923C2.53846 15.4982 2.19407 15.1538 1.76923 15.1538C1.3444 15.1538 1 15.4982 1 15.923C1 16.3479 1.3444 16.6923 1.76923 16.6923Z" stroke="#B8C2CC" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7.1543 15.9229H21.0004" stroke="#B8C2CC" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </Card>
            </div>);
}