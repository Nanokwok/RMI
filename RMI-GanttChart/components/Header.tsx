export default function Header() {
    return(
        <>
            <div className="h-auto bg-white flex flex-row items-center justify-start px-8 py-4 shadow-sm">
                <div className="w-full flex gap-4">
                    <div className="items-center p-2 bg-gray-300 rounded-md">
                        Logo
                    </div>
                    <h5 className="!text-indigo-700">
                        Mitigation Plan
                    </h5>
                </div>
                <div className="flex items-center gap-4">
                    <p className="font-medium text-sky-600 bg-sky-50 px-3 py-2 rounded-md">
                        User
                    </p>
                    <div className="items-center p-2 bg-gray-300 rounded-md">
                        Lang
                    </div>
                    <div className="items-center p-2 bg-gray-300 rounded-md">
                        Profile
                    </div>
                </div>
            </div>
        </>
    )
}