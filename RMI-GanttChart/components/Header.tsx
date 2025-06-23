export default function Header() {
    return(
        <>
            <div className="flex flex-row items-center justify-start h-auto px-8 py-4 bg-white shadow-sm">
                <div className="flex w-full gap-4">
                    <div className="items-center p-2 bg-gray-300 rounded-md">
                        Logo
                    </div>
                    <h5 className="!text-indigo-700">
                        Mitigation Plan
                    </h5>
                </div>
                <div className="flex items-center gap-4">
                    <p className="px-3 py-2 font-medium text-sky-600 bg-sky-50 rounded-md">
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