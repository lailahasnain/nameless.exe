# -*- coding: utf-8 -*-
"""
Created on Fri Nov  1 03:37:13 2019

@author: Nicholas Perez-Aguilar
"""
from matplotlib import pyplot as plt
from matplotlib import style
from datetime import date, timedelta
#import numpy as np
import re
import csv
import time
style.use('ggplot')

class Add_card():
    """ This class compiles all the data in the order that it needs to be in for the .csv file """
    def __init__(self, index, card_name, sprint, sp):
        self.index = index
        self.name = card_name
        self.sprint = sprint
        self.storyPoints = sp
        self.complete = 0
        
    def compile_data(self):
        """Returns the compiled data that will be pushed back to the .csv file - append """
        print("The data being pushed to the file is as follows...\n")
        print("Index: ", self.index)
        print("Name: ", self.name)
        print("Sprint: ", self.sprint)
        print("Story Points: ", self.storyPoints)
        print("Complete: ", self.complete)
        
    def return_data(self):
        return([self.index, self.name, self.sprint, self.storyPoints, self.complete])


# Known variables
total_days = 58.0
total_sprints = 3.0
total_sp_alloted = 0.0
total_sp_completed = 0.0
d1 = date(2019, 10, 14)
d3 = date(2019, 12, 4)

# Global variables
path = ""
path_days = ""
index_list = []
card_name_list = []
sprint_list = []
story_points_list = []
completed_list = []
verify = False
date_sp_completed = []
title_line = ["Index", "Card Name", "Sprint Number", "Story Points", "Completed?"]
data_title_line = ["Days"]

def clear_data():
    global total_sp_alloted, total_sp_completed, verify, index_list, card_name_list, sprint_list, story_points_list, completed_list, date_sp_completed
    
    # Known variables
    total_sp_alloted = 0
    total_sp_completed = 0
    
    # Global variables
    index_list.clear()
    card_name_list.clear()
    sprint_list.clear()
    story_points_list.clear()
    completed_list.clear()
    date_sp_completed.clear()
    verify = False

def get_file_path():
    global path, path_days
    exists = False
    
    while(exists == False):
        path = input("Please enter the absolute file path to the data .csv file: ")
        path_days = input("Please enter the absolute file path to the days .csv file: ")
        
        try:
            with open(path, "r+") as csvfile:
                csvfile.close()
                exists = True
        except FileNotFoundError:
            print("The data file does not exist")
            exists = False

    # Reset value
    exists = False    
        
    while(exists == False):             
        try:
            with open(path_days, "r+") as csvfile2:
                csvfile2.close()                                
                exists = True
        except FileNotFoundError:
            print("The days file does not exist")
            exists = False

def read_file():
    global path, path_days, index_list, card_name_list, sprint_list, story_points_list, completed_list, title_line
    
    with open(path, "r") as csvfile:
        csvfile.readline()  # Used to skip the first line in the file
        readCSV = csv.reader(csvfile, delimiter = ',')
        for row in readCSV:
            if(row == []):
                pass
            else:
                index_list.append(row[0])
                card_name_list.append(row[1])
                sprint_list.append(row[2])
                story_points_list.append(row[3])
                completed_list.append(row[4])
                
    with open(path_days, "r") as csvfile2:
        csvfile2.readline()  # Used to skip the first line in the file
        readCSV = csv.reader(csvfile2, delimiter = ',')
        for row in readCSV:
            if(row == []):
                pass
            else:
                date_sp_completed.append(row[0])
            
def space():
    for i in range(30):
        print('\n')

def get_info():
    global verify
    
    name = ""
    sprint = sp = 0
    failed = True
    index = 1
    choice = ""
    
    name = input("Please enter the card name: ")
    
    while(failed == True):
        try:
            sprint = int(input("Please enter the sprint the card occurs in: "))
        except ValueError:
            print("Invalid value. Please type a number between 1 and 3.")
            failed = True
            
        if(sprint >= 1 and sprint <= 3):
            failed = False
        else:
            failed = True
            
    failed = True   # Reassign value to fail so that it enters the second loop
    
    while(failed == True):
        try:
            sp = int(input("Please enter the number of story points for the card: "))
        except ValueError:
            print("Invalid value. Please type a number between 1 and 10.")
            failed = True
            
        if(sp >= 1 and sp <= 10):
            failed = False
        else:
            failed = True
            
    # Find the number we need for the index
    index += len(index_list)
    
    # Push data in to class
    card = Add_card(index, name, sprint, sp)
    
    while(choice != 'n' and choice != 'y'):
        choice = input("Would you like to verify the data before appending? [y/n]")
        
        choice = choice.lower()
        
        if(choice == 'y'):
            verify = True
        elif(choice == 'n'):
            verify = False
            
    return card
            
def push_to_csv(obj):
    global verify
    choice = ''
    valid = False
    
    if(verify == True):
        space()
        obj.compile_data()
        verify = False
        
        while(choice != 'n' and choice != 'y'):
            choice = input("Is the data correct? [y/n]")
            
            choice = choice.lower()
            
            if(choice == 'y'):
                valid = True
            elif(choice == 'n'):
                valid = False
    else:
        valid = True    # Assume it's true if no verification is wanted
                
    if(valid == True):
        # open and append the new data
        #print("This is the data returned", obj.return_data())
        with open(path, "a+", newline = '') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(obj.return_data())

        space()
        print("Append Successful!")
        time.sleep(2)
        space()
        Menu()
    elif(valid == False):
        print("Let's try again...")
        time.sleep(2)
        space()
        Menu()

def get_days():
    s = date.today()            # Get the datetime obj for today's date
    s = str(s)                  # Convert datetime obj into string
    s = re.sub("-", " ", s)     # Replace '-' with spaces
    s = s.split()           # Split string by spaces and push ihto an array
    d2 = date(int(s[0]), int(s[1]), int(s[2]))
    
    return (d2 - d1).days

def remaining_days():
    s = date.today()            # Get the datetime obj for today's date
    s = str(s)                  # Convert datetime obj into string
    s = re.sub("-", " ", s)     # Replace '-' with spaces
    s = s.split()           # Split string by spaces and push ihto an array
    d2 = date(int(s[0]), int(s[1]), int(s[2]))
    
    return (d3 - d2).days

def compute():
    global total_sp_alloted, total_sp_completed
    
    # Variables
    y_predicted = []
    y_actual = []
    x_days_arr = []
    y_pred_const = 0.0
    dec_tot_sp = 0.0
    y_tot_sp = 0.0
    
    for i in range(len(story_points_list)):
        total_sp_alloted += int(story_points_list[i])
        
        if(int(completed_list[i]) == 1):
            total_sp_completed += int(story_points_list[i])
    
    # Get y-actual from second .csv file
    y_tot_sp = total_sp_alloted
    for i in range(len(date_sp_completed)):
        y_tot_sp -= int(date_sp_completed[i])
        y_actual.append(y_tot_sp)

    # Get the predicted burndown rate average
    y_pred_const = (total_sp_alloted / total_days)   
    dec_tot_sp = total_sp_alloted
    
    # Get the value that should be added
    for i in range(int(total_days)):
        dec_tot_sp -= y_pred_const
        y_predicted.append(dec_tot_sp)
          
    # Push the x-axis points into an array
    for i in range(int(total_days)):
        x_days_arr.append((i + 1))
    
#    print("\nY-actual:", y_actual)
#    print("date stuff:", date_sp_completed)
#    print("Total days array", x_days_arr)
#    print("Total prediction", y_predicted)
#    print("alloted list", story_points_list)
#    print("completed list", completed_list)
    
    space()
    print("Total allotted story points:", total_sp_alloted)
    print("Total completed story points:", total_sp_completed)
    
    # Create a graph from the data
    plt.plot(x_days_arr, y_predicted)
    plt.plot(x_days_arr, y_actual)
    plt.title('Nameless.exe Burndown Log')
    plt.ylabel('Story Points')
    plt.xlabel('Days')
    plt.show()
    
    # Show how many days we have been working on the project.    
    working_days = get_days()
    remain = remaining_days()
    
    print("We have been working on this project for a total of:", working_days, "days!")
    print("We have a total of:", remain, "remaining days!")
    time.sleep(5)

def enter_date():
    global d1
    
    year = month = day = 0
    valid = False
    
    while(valid == False):
        try:
            year = int(input("Please enter the year: "))
            
            if(year >= 2019):
                valid = True
            else:
                valid = False
        except ValueError:
            print("Please enter a numerical value")
            valid = False
            
    # Reset Value
    valid = False
    
    while(valid == False):
        try:
            month = int(input("Please enter the month: "))
            
            if(month >= 1 and month <= 12):
                valid = True
            else:
                valid = False
        except ValueError:
            print("Please enter a numerical value")
            valid = False
            
    # Reset value
    valid = False
    
    while(valid == False):
        try:
            day = int(input("Please enter the day: "))
            
            if(day >= 1 and day <= 31):
                valid = True
            else:
                valid = False
        except ValueError:
            print("Please enter a numerical value")
            valid = False

    d2 = date(year, month, day)
    
    return (d2 - d1).days

def ask_date():
    choice = ''
    update_day = ''
    
    while(choice != 'y' and choice != 'n'):
        choice = input("Did you complete this card today? [y/n] ")
        choice = choice.lower()
        space()
        
    if(choice == 'y'):
        update_day = get_days()
    elif(choice == 'n'):
        update_day = enter_date()
    else:
        print("Something has gone wrong. Check the code!")
        
    return update_day

def display_choices():
    global completed_list
    uncomplete_choices = []
    valid_choice = False
    choice = 0
    which_day_update = 0
    
    print("\t\t\tDisplaying choices of non-completed cards\n\n\n")
    
    for i in range(len(completed_list)):
        if(int(completed_list[i]) == 0):
            print(index_list[i], end= ") ")
            print(card_name_list[i], "\tSprint:", sprint_list[i], "\tStory Points:", story_points_list[i])
            uncomplete_choices.append(int(index_list[i]))
            
    print("\n\n")
    while(valid_choice == False):
        try:
            choice = int(input("Please select which story you completed [0 to cancel]: "))
            
            if((choice in uncomplete_choices) or (choice == 0)):
                valid_choice = True
            else:
                valid_choice = False
            
        except ValueError:
            print("Please enter a valid number!\n")
            valid_choice = False

    if(choice == 0):
        pass
    else:
        # Update list to reflect change            
        completed_list[choice - 1] = "1"
        
        # Update actual .csv file which it came from
        with open(path, "w", newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(title_line)
            for i in range(len(index_list)):
                writer.writerow([str(index_list[i]), str(card_name_list[i]), str(sprint_list[i]), str(story_points_list[i]), str(completed_list[i])])
        
        # Update the days .csv file to reflect the change
        space()
        which_day_update = ask_date()
        date_sp_completed[which_day_update] = story_points_list[choice - 1]
        
        # Update actual .csv file which it came from
        with open(path_days, "w", newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(data_title_line)
            for i in range(len(date_sp_completed)):
                writer.writerow(date_sp_completed[i])
    Menu()
    
def Menu():
    choice = ""
    space()
    clear_data()
    read_file()
    
    print("******************************************")
    print("*       Nameless.exe Burndown Log        *")
    print("******************************************")
    print("\n\n\n\n\n")
    
    print("1) Add Story")
    print("2) View Burndown Chart")
    print("3) Update story completion")
    print("4) Exit Program\n\n")
    
    while(choice != "1" and choice != "2" and choice != "3" and choice != "4"):
        choice = input("What would you like to do: ")
        
    if(choice == "1"):
        card_obj = get_info()
        push_to_csv(card_obj)
    elif(choice == "2"):
        clear_data()
        read_file()
        space()
        compute()
        Menu()
    elif(choice == "3"):
        clear_data()
        read_file()
        space()
        display_choices()   # Need to ask for date input so that it can write to both files.
        print("Update completed")
    elif(choice == "4"):
        print("Exiting", end='')
        time.sleep(1)
        print(".", end='')
        time.sleep(1)
        print(".", end='')
        time.sleep(1)
        print(".", end='')        
        time.sleep(1)
        exit()

# Used to start the program (Main)
if(__name__ == '__main__'):
    get_file_path()
    read_file()
    space()
    Menu()