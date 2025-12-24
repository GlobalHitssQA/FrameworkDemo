package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class ProspectSearchPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators - inferred based on best practices
    private By prospectSearchMenu = By.cssSelector("[data-testid='prospect-search-menu']");
    private By searchField = By.id("prospect-search-input");
    private By searchHistoryDropdown = By.cssSelector("[data-testid='search-history-dropdown']");
    private By searchHistoryItems = By.cssSelector(".search-history-item");
    private By historyItemName = By.className("prospect-name");
    private By historyItemEmail = By.className("prospect-email");
    private By prospectDetailsPanel = By.cssSelector("[data-testid='prospect-details-panel']");
    private By continueButton = By.cssSelector("[data-testid='continue-process-btn']");
    private By prospectActions = By.className("prospect-actions");
    
    public ProspectSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void navigateToProspectSearch() {
        WebElement searchMenu = wait.until(ExpectedConditions.elementToBeClickable(prospectSearchMenu));
        searchMenu.click();
    }
    
    public boolean isSearchFieldEnabled() {
        WebElement field = wait.until(ExpectedConditions.presenceOfElementLocated(searchField));
        return field.isEnabled();
    }
    
    public void clickSearchField() {
        WebElement field = driver.findElement(searchField);
        field.click();
        // Wait for history dropdown to appear
        wait.until(ExpectedConditions.visibilityOfElementLocated(searchHistoryDropdown));
    }
    
    public void typeInSearchField(String text) {
        WebElement field = driver.findElement(searchField);
        field.clear();
        field.sendKeys(text);
    }
    
    public int getSearchHistoryCount() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(searchHistoryDropdown));
        List<WebElement> historyItems = driver.findElements(searchHistoryItems);
        return historyItems.size();
    }
    
    public boolean allHistoryItemsHaveName() {
        List<WebElement> historyItems = driver.findElements(searchHistoryItems);
        for (WebElement item : historyItems) {
            try {
                WebElement nameElement = item.findElement(historyItemName);
                if (nameElement.getText().trim().isEmpty()) {
                    return false;
                }
            } catch (Exception e) {
                return false;
            }
        }
        return true;
    }
    
    public boolean allHistoryItemsHaveEmail() {
        List<WebElement> historyItems = driver.findElements(searchHistoryItems);
        for (WebElement item : historyItems) {
            try {
                WebElement emailElement = item.findElement(historyItemEmail);
                if (emailElement.getText().trim().isEmpty()) {
                    return false;
                }
            } catch (Exception e) {
                return false;
            }
        }
        return true;
    }
    
    public void selectFirstHistoryItem() {
        List<WebElement> historyItems = driver.findElements(searchHistoryItems);
        if (!historyItems.isEmpty()) {
            historyItems.get(0).click();
        }
    }
    
    public void selectHistoryItemByIndex(int index) {
        List<WebElement> historyItems = driver.findElements(searchHistoryItems);
        if (index >= 0 && index < historyItems.size()) {
            historyItems.get(index).click();
        }
    }
    
    public boolean isProspectDetailsDisplayed() {
        try {
            WebElement detailsPanel = wait.until(ExpectedConditions.visibilityOfElementLocated(prospectDetailsPanel));
            return detailsPanel.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean areContinueOptionsAvailable() {
        try {
            WebElement continueBtn = driver.findElement(continueButton);
            WebElement actions = driver.findElement(prospectActions);
            return continueBtn.isDisplayed() || actions.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getSelectedProspectName() {
        WebElement detailsPanel = driver.findElement(prospectDetailsPanel);
        WebElement nameElement = detailsPanel.findElement(By.className("prospect-detail-name"));
        return nameElement.getText();
    }
    
    public String getSelectedProspectEmail() {
        WebElement detailsPanel = driver.findElement(prospectDetailsPanel);
        WebElement emailElement = detailsPanel.findElement(By.className("prospect-detail-email"));
        return emailElement.getText();
    }
}