function ListThemes({ setTheme, setNameTheme }) {
    const colors = [
        { theme: '#277C78', name: 'Green' },
        { theme: '#F2CDAC', name: 'Yellow' },
        { theme: '#82C9D7', name: 'Cyan' },
        { theme: '#626070', name: 'Navy' },
        { theme: '#C94736', name: 'Red' },
        { theme: '#826CB0', name: 'Purple' },
        { theme: '#597C7C', name: 'Turquoise' },
        { theme: '#93674F', name: 'Brown' },
        { theme: '#934F6F', name: 'Magenta' },
        { theme: '#3F82B2', name: 'Blue' },
        { theme: '#97A0AC', name: 'Navy Grey' },
        { theme: '#7F9161', name: 'Army Green' },
        { theme: '#AF81BA', name: 'Pink' },
        { theme: '#CAB361', name: 'Gold' },
        { theme: '#BE6C49', name: 'Orange' }
    ];

    return (
        <ul className="absolute  top-16 w-full bg-white rounded-lg overflow-y-scroll h-[150px] shadow-[0px_-2px_10px_0px_rgba(51,_65,_85,_0.12)] divide-gray-100 divide-y-2 color-scroll">
            {
                colors.map((color) =>
                    <li onClick={() => {
                        setTheme(color.theme)
                        setNameTheme(color.name)
                    }} className="flex items-center gap-5 p-3 cursor-pointer" key={color.theme}>
                        <div className="size-4 rounded-full" style={{ backgroundColor: color.theme }}></div>
                        {color.name}
                    </li>)
            }
        </ul >
    )
}

export default ListThemes

