import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Try to handle both CJS and ESM environments for gray-matter
const matterFn = matter.default || matter;

const hotelsDir = path.join(process.cwd(), 'content', 'hotels');
const outputFile = path.join(process.cwd(), 'IMAGE_PROMPTS_HOTELS.md');

// Ensure directory exists
if (!fs.existsSync(hotelsDir)) {
    console.error(`Directory not found: ${hotelsDir}`);
    process.exit(1);
}

const files = fs.readdirSync(hotelsDir).filter(f => f.endsWith('.mdx'));

let content = `# Hotel Image Prompts\n\nGenerated due to quota limits. Use these prompts to generate images later.\n\n`;

let count = 0;
files.forEach(file => {
    const filePath = path.join(hotelsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    try {
        const { data } = matterFn(fileContent);

        const hotelName = data.hotelName || data.title;
        const area = data.area || 'Naples, FL';
        const desc = data.description || '';
        const alt = data.featuredImageAlt || '';

        const am1 = data.amenities?.[0] || '';
        const am2 = data.amenities?.[1] || '';

        // Construct prompt
        let prompt = `Photorealistic 4K image of ${hotelName} in ${area}.`;
        if (alt) prompt += ` ${alt}.`;
        else if (desc) prompt += ` ${desc.split('.')[0]}.`;

        if (am1 || am2) {
            prompt += ` Featuring`;
            if (am1) prompt += ` ${am1}`;
            if (am1 && am2) prompt += ` and`;
            if (am2) prompt += ` ${am2}`;
            prompt += `.`;
        }

        prompt += ` Sunny day, vibrant colors, architectural photography, hyper-realistic.`;

        const slug = file.replace('.mdx', '');

        content += `## ${slug}\n`;
        content += `- **File**: \`content/hotels/${file}\`\n`;
        content += `- **Proposed Image**: \`public/images/hotels/${slug}.jpg\`\n`;
        content += `- **Prompt**: ${prompt}\n\n`;
        count++;
    } catch (e) {
        console.error(`Error parsing ${file}: ${e.message}`);
    }
});

fs.writeFileSync(outputFile, content);
console.log(`Generated prompts for ${count} hotels in ${outputFile}`);
