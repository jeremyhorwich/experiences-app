import "./paginationControl.css"

type PaginationControlsProps = {
    currentPage: number,
    onChange: (dir: -1 | 1) => void
}

function PaginationControl(props: PaginationControlsProps) {
    return (
        <div>
            {props.currentPage > 0 && <span className="page-button" onClick={() => props.onChange(-1)}>{"<"}</span>}
            <span> Page {props.currentPage} </span>
            <span className="page-button" onClick={() => props.onChange(1)}>{">"}</span>
        </div>
    )
}

export { PaginationControl };