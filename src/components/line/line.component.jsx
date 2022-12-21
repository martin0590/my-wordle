import './line.style.css';

const WORDS_LENGTH = 5;
const Line = ({guess, solution, isFinal}) =>{
    const tiles = [];
    for(let i = 0; i < WORDS_LENGTH; i++){
        const char = guess[i];
        let className = 'tile';

        if(isFinal){
            if(char === solution[i]){
                className += ' correct';
            }else if(solution.includes(char)){
                className += ' close';
            }else{
                className += ' incorrect';
            }
        }

        tiles.push(<div key={i} className={className}>{char}</div>);
    }

    return(
        <div className='row-container'>
            {tiles}
        </div>
    )
}

export default Line;