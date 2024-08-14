
function DescriptionWithManyImagesWorkDetail() {
    return (
        <div className="changing-stack">
            <div>
                <img className="logo animated" src={"../../../../public/" + workDetail.images[0]} alt={workDetail.title} onLoad={() => setLogoLoaded(true)} style={{ opacity: logoLoaded ? 1 : 0 }} />
            </div>
            <h3 className="animated" style={{ width: "auto", color: work.primaryTextColor.toRgbString(), fontFamily: work.titleFont, fontWeight: "medium", opacity: logoLoaded ? 1 : 0 }}>
                {replaceSpecialCharacters(workDetail.title)}
            </h3>
        </div>
    );
}

export default DescriptionWithManyImagesWorkDetail;