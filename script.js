// Points Calculator Application
class PointsCalculator {
    constructor() {
        // Define all activities by stage
        this.stages = {
            stage1: [
                'buy-diamonds-1',
                'consume-magic-stones',
                'consume-crystal',
                'summon-relic',
                'relic-rare',
                'relic-epic',
                'relic-legendary',
                'boost-facility',
                'construction-speedup',
                'dragon-essence-1',
                'timber',
                'stone',
                'rubies-1'
            ],
            stage2: [
                'buy-diamonds-2',
                'consume-magic-stones-2',
                'consume-crystal-2',
                'summon-relic-2',
                'relic-rare-2',
                'relic-epic-2',
                'relic-legendary-2',
                'boost-tech',
                'research-speedup',
                'dragon-essence-2',
                'timber-2',
                'stone-2',
                'rubies-2'
            ],
            stage3: [
                'use-diamonds-3',
                'refined-metal',
                'magic-thread',
                'orichalcum',
                'gather-stones-timber',
                'gather-rubies',
                'complete-bounty',
                'kill-mobs-30',
                'kill-bosses-9',
                'help-rally'
            ],
            stage4: [
                'use-diamonds-4',
                'refined-metal-4',
                'magic-thread-4',
                'orichalcum-4',
                'recruitment-shard',
                'hero-shard-epic',
                'hero-shard-legendary',
                'hero-shard-mythic',
                'soul-stone'
            ]
        };
        
        this.init();
    }

    init() {
        // Set up event listeners for all stages
        this.setupAllListeners();
        
        // Initial calculation for all stages
        this.calculateAllStages();
    }

    setupAllListeners() {
        // Set up listeners for all activities across all stages
        Object.keys(this.stages).forEach(stageKey => {
            this.stages[stageKey].forEach(activity => {
                const inventoryInput = document.querySelector(`.inventory-input[data-activity="${activity}"]`);
                if (inventoryInput) {
                    inventoryInput.addEventListener('input', () => {
                        this.calculateRowTotal(activity);
                        // Calculate the stage total for the stage this activity belongs to
                        const stageNumber = stageKey.replace('stage', '');
                        this.calculateStage(stageNumber);
                    });
                }
            });
        });
    }

    calculateRowTotal(activity) {
        // Find the inventory input first, then get its parent row
        const inventoryInput = document.querySelector(`.inventory-input[data-activity="${activity}"]`);
        if (!inventoryInput) return;

        const row = inventoryInput.closest('tr');
        if (!row) return;

        // Get Units value (from readonly input)
        const unitsInput = row.querySelector(`.units-input[data-activity="${activity}"]`);
        const units = parseFloat(unitsInput?.value) || 0;

        // Get Points value (from the points-cell in the same row)
        const pointsCell = row.querySelector('.points-cell');
        const points = parseFloat(pointsCell?.textContent) || 0;

        // Get Inventory value (from input)
        const inventory = parseFloat(inventoryInput.value) || 0;

        // Calculate Total = (Inventory / Units) * Points
        // Use Math.floor to get whole number (no rounding)
        let total = 0;
        if (units > 0) {
            total = Math.floor((inventory / units) * points);
        }

        // Update the total cell
        const totalCell = row.querySelector(`.total-cell[data-activity="${activity}"]`);
        if (totalCell) {
            totalCell.textContent = this.formatNumber(total);
        }
    }

    calculateStage(stageNumber) {
        const stageKey = `stage${stageNumber}`;
        const activities = this.stages[stageKey];
        
        if (!activities) return;

        let stageTotal = 0;

        activities.forEach(activity => {
            const totalCell = document.querySelector(`.total-cell[data-activity="${activity}"]`);
            if (totalCell) {
                // Parse the text content, removing commas for proper parsing
                const textValue = totalCell.textContent.replace(/,/g, '');
                const value = parseFloat(textValue) || 0;
                stageTotal += value;
            }
        });

        // Update Stage Total in the top box
        const stageTotalBox = document.getElementById(`${stageKey}-total`);
        if (stageTotalBox) {
            stageTotalBox.textContent = this.formatNumber(stageTotal);
            this.adjustFontSize(stageTotalBox);
        }
        
        // Calculate overall total after updating this stage
        this.calculateOverallTotal();
    }
    
    calculateOverallTotal() {
        let overallTotal = 0;
        
        // Sum all stage totals
        Object.keys(this.stages).forEach(stageKey => {
            const stageTotalBox = document.getElementById(`${stageKey}-total`);
            if (stageTotalBox) {
                const textValue = stageTotalBox.textContent.replace(/,/g, '');
                const value = parseFloat(textValue) || 0;
                overallTotal += value;
            }
        });
        
        // Update Overall Total box
        const overallTotalBox = document.getElementById('overall-total');
        if (overallTotalBox) {
            overallTotalBox.textContent = this.formatNumber(overallTotal);
            this.adjustFontSize(overallTotalBox);
        }
    }

    calculateAllStages() {
        // Calculate totals for all stages
        Object.keys(this.stages).forEach(stageKey => {
            const stageNumber = stageKey.replace('stage', '');
            this.calculateStage(stageNumber);
        });
        
        // Adjust font sizes for all total boxes after a brief delay to ensure layout is complete
        setTimeout(() => {
            this.adjustAllFontSizes();
        }, 100);
    }
    
    adjustAllFontSizes() {
        // Adjust font size for all stage totals
        Object.keys(this.stages).forEach(stageKey => {
            const stageTotalBox = document.getElementById(`${stageKey}-total`);
            if (stageTotalBox) {
                this.adjustFontSize(stageTotalBox);
            }
        });
        
        // Adjust font size for overall total
        const overallTotalBox = document.getElementById('overall-total');
        if (overallTotalBox) {
            this.adjustFontSize(overallTotalBox);
        }
    }

    formatNumber(num) {
        // Handle NaN and Infinity
        if (!isFinite(num)) {
            return '0';
        }
        
        // Use Math.floor to ensure whole number (no rounding)
        const wholeNumber = Math.floor(num);
        return wholeNumber.toLocaleString('en-US', {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        });
    }
    
    adjustFontSize(element) {
        if (!element) return;
        
        // Reset to base font size
        element.style.fontSize = '';
        
        // Get the container width (parent total-box)
        const container = element.closest('.total-box');
        if (!container) return;
        
        const containerWidth = container.clientWidth - 40; // Account for padding
        const baseFontSize = parseFloat(window.getComputedStyle(element).fontSize);
        let fontSize = baseFontSize;
        
        // Create a temporary element to measure text width
        const temp = document.createElement('span');
        temp.style.visibility = 'hidden';
        temp.style.position = 'absolute';
        temp.style.whiteSpace = 'nowrap';
        temp.style.fontSize = `${fontSize}px`;
        temp.style.fontWeight = 'bold';
        temp.textContent = element.textContent;
        document.body.appendChild(temp);
        
        let textWidth = temp.offsetWidth;
        
        // Reduce font size until text fits
        while (textWidth > containerWidth && fontSize > 0.75) {
            fontSize -= 0.5;
            temp.style.fontSize = `${fontSize}px`;
            textWidth = temp.offsetWidth;
        }
        
        document.body.removeChild(temp);
        
        // Apply the calculated font size
        element.style.fontSize = `${fontSize}px`;
    }
}

// Initialize calculator when DOM is loaded
let calculator;
document.addEventListener('DOMContentLoaded', () => {
    calculator = new PointsCalculator();
    
    // Adjust font sizes on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (calculator) {
                calculator.adjustAllFontSizes();
            }
        }, 250);
    });
});
