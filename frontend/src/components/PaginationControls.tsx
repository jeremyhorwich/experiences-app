type PaginationControlsProps = {
    currentPage: number,
    onChange: (dir: -1 | 1) => void
}

function PaginationControl(props: PaginationControlsProps) {
    return (
        <div>
            {props.currentPage > 0 && <button onClick={() => props.currentPage - 1}> {"<"} </button>}
            <span> Page {props.currentPage + 1}</span>
            <button onClick={() => props.currentPage + 1}> {">"} </button>
        </div>
    )
}

export { PaginationControl };