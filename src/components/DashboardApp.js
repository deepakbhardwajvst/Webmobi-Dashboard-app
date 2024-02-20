import React, { useState } from 'react';

const DashboardApp = () => {
    const [images, setImages] = useState([]);
    const [availableModules] = useState([
        { id: 'module1', src: 'module1.jpg', title: 'Module 1' },
        { id: 'module2', src: 'module2.jpg', title: 'Module 2' },

    ]);

    const addModule = (module) => {
        const newImage = {
            id: images.length + 1,
            src: module.src,
            top: 0,
            left: 0,
        };

        setImages([...images, newImage]);
    };

    const removeImage = (id) => {
        setImages(images.filter((image) => image.id !== id));
    };

    const handleDrag = (id, e, position) => {
        const newImages = images.map((image) =>
            image.id === id ? { ...image, top: position.top, left: position.left } : image
        );

        setImages(newImages);
    };

    return (
        <div>
            <div>
                <strong>Available Modules:</strong>
                {availableModules.map((module) => (
                    <div key={module.id} onClick={() => addModule(module)} style={{ cursor: 'pointer' }}>
                        {module.title}
                    </div>
                ))}
            </div>

            <div style={{ position: 'relative', height: '500px', border: '1px solid #000' }}>
                {images.map((image) => (
                    <div
                        key={image.id}
                        style={{
                            position: 'absolute',
                            top: `${image.top}px`,
                            left: `${image.left}px`,
                            border: '1px solid #000',
                        }}
                        draggable
                        onDrag={(e) => e.preventDefault()}
                        onDragEnd={(e) => handleDrag(image.id, e, { top: e.clientY, left: e.clientX })}
                    >
                        <img src={image.src} alt={`Module ${image.id}`} width="100" height="100" />
                        <button onClick={() => removeImage(image.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardApp;
