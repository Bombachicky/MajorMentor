
export function Navbar(){
    let navbarItem:string = "px-4 text-indigo-400 hover:text-amber-300 transition-all duration-200";
    return(
        <>
            <div className="bg-ucfblack border-b-2 border-b-yellow-300 shadow-glow  flex justify-between">
                <div className="flex items-center">
                    <div>
                        <img src="https://www.ucf.edu/brand/wp-content/blogs.dir/13/files/2016/07/UCF-tab-NoBleed_vert-KG-7406.png" width="60vw" height="60vh"/>
                    </div>
                    <div className={navbarItem + " font-averox"}>{`<`} Major Mentor {`/>`}</div>
                </div>
                <div className="flex items-center text-white">
                    <div className={"hover:cursor-pointer font-averox " + navbarItem}>Home</div>
                    <div className={"hover:cursor-pointer font-averox " + navbarItem}>Made By Bombachicky</div>
                </div>
            </div>
        </>
    )
}