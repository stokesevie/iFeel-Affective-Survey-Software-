import pandas as pd
import matplotlib.pyplot as plt
import sys

# Get the input file name from command-line argument
combined = sys.argv[1]
scenario = sys.argv[2]
demo = sys.argv[3]


# Load data from csv file
data_combined = pd.read_csv(combined)
data_scenario = pd.read_csv(scenario)
data_demo = pd.read_csv(demo)

data_collected =[data_combined,data_scenario]


# Calculate SUS scores
compared=[]
for data in data_collected:
    sus = []
    for index, row in data.iterrows():
        odd = (row[0] + row[2] + row[4] + row[6] + row[8]) - 5
        even = 25 - (row[1] + row[3] + row[5] + row[7] + row[9])
        total = (odd + even) * 2.5
        sus.append(total)
    compared.append(sus)

sus = []
for index, row in data_demo.iterrows():
        odd = (row[0] + row[2] + row[4] + row[6]) - 5
        even = 25 - (row[1] + row[3] + row[5] + row[7])
        total = (odd + even) * 2.5
        sus.append(total)
compared.append(sus)

# Create a figure and axis instance
fig, ax = plt.subplots(figsize=(9, 6))

# Create the boxplot
bp = ax.boxplot(compared, notch=0, patch_artist=1, sym='+', vert=1, whis=1.5)

# Set axis labels and title
ax.set_title('Comparison of SUS Scores')
ax.set_xlabel('Evaluation technique')
ax.set_ylabel('Percentage %')

# Customize x-axis labels
ax.set_xticklabels(['Combined Testing','Scenario testing', 'Demo Testing'])

# Set y-axis limit
ax.set_ylim(0, 100)

# Remove top and right axes ticks
ax.tick_params(top=False, right=False)

# Add horizontal grid lines
ax.yaxis.grid(True, linestyle='-', which='major', color='lightgrey', alpha=0.5)

# Set the colors for the boxplot elements
colors = ['#FFC300', '#F4D03F', '#3498DB']
for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)

# Save the figure
fig.savefig('multiple-boxplot.png', bbox_inches='tight')

# Show the plot
fig.savefig('multiple-boxplot.png', bbox_inches='tight')
plt.show()
