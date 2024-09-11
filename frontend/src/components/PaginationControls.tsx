type PaginationControlsProps = {
    currentPage: number,
    onChange: (pageNumber: number) => void
}

function PaginationControl(props: PaginationControlsProps) {
    return (
        <div>
            <button onClick={() => props.currentPage - 1}> {"<"} </button>
            <span> Page {props.currentPage + 1}</span>
            <button onClick={() => props.currentPage + 1}> {">"} </button>
        </div>
    )
}

export { PaginationControl };