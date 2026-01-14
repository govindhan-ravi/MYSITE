import React from 'react';

const Privacy = () => {
    return (
        <div className="py-12 glass-panel p-8">
            <h1 className="text-3xl font-serif font-bold mb-6">Privacy Policy</h1>
            <div className="space-y-4 text-gray-700">
                <p>At I FRAME YOUU, accessible from iframeyouu.com, one of our main priorities is the privacy of our visitors.</p>
                <h2 className="text-xl font-bold mt-4">Information We Collect</h2>
                <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
                <h2 className="text-xl font-bold mt-4">How we use your information</h2>
                <p>We use the information we collect in various ways, including to:</p>
                <ul className="list-disc pl-5">
                    <li>Provide, operate, and maintain our website</li>
                    <li>Improve, personalize, and expand our website</li>
                    <li>Understand and analyze how you use our website</li>
                    <li>Develop new products, services, features, and functionality</li>
                </ul>
            </div>
        </div>
    );
};

export default Privacy;
