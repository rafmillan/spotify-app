import ButtonGroup from "./ButtonGroup";
import AlbumWall from "./AlbumWall";
import ArtistWall from "./ArtistWall";
import PieChart from "./PieChart";
import "../styles/tailwind.css"

export const Content = ({title, list, buttonHandler, Component}) => {
    const buttons = [
        { label: "short term" },
        { label: "medium term" },
        { label: "long term" },
    ];

    function handleButtonClick(button) {
        buttonHandler(button)
    }

    function renderComponent(Component) {
        if (Component === AlbumWall) {
            return <Component songs={list}/>
        }
        else if (Component === ArtistWall) {
            return <Component artists={list}/>
        }
        else if (Component === PieChart) {
            return <Component data={list}/>
        }
    }

    return (
        <div className="grid grid-cols-1 px-4 py-4 pt-10 sm:max-w-xl md:max-w-full md:px-24 lg:px-64">
            <div className="flex">
                <div className="w-1/2">
                    <h5 className="px-2 mb-2 text-4xl font-semibold leading-none lg:pt-4">
                        {title}
                    </h5>
                </div>
                <div className="w-1/2">
                    <ButtonGroup buttons={buttons} onButtonClick={handleButtonClick}/>
                </div>
            </div>
            <hr className="border-bone mb-4" />
            <div>
                {renderComponent(Component)}
            </div>
        </div>
    );
  };