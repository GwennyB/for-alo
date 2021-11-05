import * as fs from "fs";

const path = "./names.txt";
const princePhilip = "His Royal Highness The Prince Philip, Duke of Edinburgh, Earl of Merioneth, Baron Greenwich, Royal Knight of the Most Noble Order of the Garter, Extra Knight of the Most Ancient and Most Noble Order of the Thistle, Member of the Order of Merit, Grand Master and First and Principal Knight Grand Cross of the Most Excellent Order of the British Empire, Knight of the Order of Australia, Additional Member of the Order of New Zealand, Extra Companion of the Queen’s Service Order, Royal Chief of the Order of Logohu, Extraordinary Companion of the Order of Canada, Extraordinary Commander of the Order of Military Merit, Lord of Her Majesty’s Most Honourable Privy Council, Privy Councillor of the Queen’s Privy Council for Canada, Personal Aide-de-Camp to Her Majesty, Lord High Admiral of the United Kingdom";



const getPointsForName = (name: string): number => {
    const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
    const cPoints = 1;
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const vPoints = 5;

    const nameReady = name.toUpperCase().split('');

    const letterTypeCounts = nameReady
        .reduce((acc, letter) => {
            if (consonants.includes(letter)) {
                acc.consonantCount++;
            }
            if (vowels.includes(letter)) {
                acc.vowelCount++;
            }
            return acc;
        }, { vowelCount: 0, consonantCount: 0 });

    const doublePoints = letterTypeCounts.consonantCount <= letterTypeCounts.vowelCount;
    const vowelPoints = vPoints * letterTypeCounts.vowelCount;
    const consonantPoints = cPoints * letterTypeCounts.consonantCount;
    const points = vowelPoints + consonantPoints;

    const totalPoints = doublePoints ? points * 2 : points;

    return totalPoints;
};

const princePhilipPoints = getPointsForName(princePhilip) / 181;

const getSourceList = (path: string): string[] => {
    const fileContents: string[] = fs.readFileSync(path)
        .toString()
        .split('\n');
    return fileContents;
};

interface Result {
    count: number;
    // names: string[];
}

const processNamesList = (path: string): Result => {
    const names: string[] = getSourceList(path);

    const evaluatedNames: string[] = names.reduce((acc, name) => {
        const pointsForName = getPointsForName(name);
        if (princePhilipPoints >= pointsForName) {
            acc = acc.concat([name]);
        }
        return acc;
    }, []);


    return {
        count: evaluatedNames.length,
        // names: evaluatedNames,
    };
};

const results = processNamesList(path);

console.log(JSON.stringify(results, null, 2));

// TODO: What to do with the results?
