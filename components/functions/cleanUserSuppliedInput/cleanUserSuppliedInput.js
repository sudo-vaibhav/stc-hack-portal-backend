const isString = (inputData) => {
    return typeof (inputData) == "string"
}

const cleanUserSuppliedInput = (data) => {
    const cleanedData = {
        ...data
    }
    Object.keys(cleanedData).forEach(key => {
        const value = cleanedData[key]
        const type = typeof (value)
        switch (type) {
            case "string":
                // this function should not transform ids or other important
                //supposedly immutable data
                const cleanableFieldNames = 
                ["name", 
                 "college",
                 "expectedGraduation",
                 "bio",
                 "githubLink",
                 "stackOverflowLink",
                 "externalLink",
                 "teamName",
                 "description",
                 "startDate",
                 "endDate",
                 "location",
                 "nameOfEvent",
                 "eventUrl",
                 "squadName",
                 
                ]
                // this function should not transform ids or other important
                //supposedly immutable data
                if(cleanableFieldNames.includes(key)){
                    cleanedData[key] = value.trim()
                }
                break
            case "object":
                //means object is array
                if (Array.isArray(value)) {
                    
                    // execute when all elements in array are strings
                    if (value.every(isString)) {
                        // this function should not transform ids or other important
                        //supposedly immutable data
                        const cleanableFieldNames = ["skills", "skillsRequired"]
                        if(cleanableFieldNames.includes(key)){
                            // 1) trimming unnecessary white space
                            // 2) making everything lowercase
                            // 3) removing empty strings
                            // 4) making sure skills are unique and not repeated
                            cleanedData[key] = [... new Set(value.map(item => item.trim().toLowerCase()).filter(item => item != ""))]
                        }
                    }
                } 
                break
        }
    });

    return cleanedData
}

module.exports = cleanUserSuppliedInput