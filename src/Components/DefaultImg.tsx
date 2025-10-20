import TaskCards from "./TaskCards.tsx";

const DefaultImg = () => {

    const imageUrl = './src/assets/task.png';

    // const handleClick = (e) => {
    //     console.log('todo - apply change image functionality ');
    // }

    return (
        <img src={imageUrl} alt="Default task" className="task-image"/>
        // <img onClick={(e) => handleClick(e)} src={imageUrl}></img>
    );
}

export default DefaultImg;