package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.Dimension;
import pages.ContractBreakdownPage;
import static org.junit.Assert.assertTrue;

public class ContractBreakdownSteps {
    private WebDriver driver;
    private ContractBreakdownPage contractBreakdownPage;
    private String currentBankingSegment;
    private String currentContractType;

    @Given("the user is authenticated in Acticenter")
    public void theUserIsAuthenticatedInActicenter() {
        driver = new ChromeDriver();
        contractBreakdownPage = new ContractBreakdownPage(driver);
        contractBreakdownPage.login();
    }

    @Given("test contracts are available for Banca Patrimonial, Banca Privada and Wealth Management")
    public void testContractsAreAvailable() {
        assertTrue("Test contracts should be configured", contractBreakdownPage.verifyTestContractsAvailable());
    }

    @Given("the browser is configured for responsive testing")
    public void theBrowserIsConfiguredForResponsiveTesting() {
        driver.manage().window().setSize(new Dimension(1024, 768));
    }

    @Given("the application is accessed in Responsive Landscape view for Banca Patrimonial with Persona Fisica contract")
    public void theApplicationIsAccessedInLandscapeForBancaPatrimonial() {
        currentBankingSegment = "Banca Patrimonial";
        currentContractType = "Persona Fisica";
        contractBreakdownPage.setLandscapeOrientation();
        contractBreakdownPage.selectBankingSegment(currentBankingSegment);
        contractBreakdownPage.selectContract(currentContractType);
    }

    @Given("the application is accessed in Responsive Landscape view for Banca Privada with Persona Moral contract")
    public void theApplicationIsAccessedInLandscapeForBancaPrivada() {
        currentBankingSegment = "Banca Privada";
        currentContractType = "Persona Moral";
        contractBreakdownPage.setLandscapeOrientation();
        contractBreakdownPage.selectBankingSegment(currentBankingSegment);
        contractBreakdownPage.selectContract(currentContractType);
    }

    @Given("the application is accessed in Responsive Landscape view for Wealth Management")
    public void theApplicationIsAccessedInLandscapeForWealthManagement() {
        currentBankingSegment = "Wealth Management";
        contractBreakdownPage.setLandscapeOrientation();
        contractBreakdownPage.selectBankingSegment(currentBankingSegment);
    }

    @Then("the application should display correctly in Landscape mode")
    public void theApplicationShouldDisplayCorrectlyInLandscapeMode() {
        assertTrue("Application should be in landscape orientation", contractBreakdownPage.isLandscapeMode());
    }

    @Then("the application should display correctly for Banca Privada in Landscape mode")
    public void theApplicationShouldDisplayCorrectlyForBancaPrivadaInLandscape() {
        assertTrue("Application should be in landscape orientation", contractBreakdownPage.isLandscapeMode());
        assertTrue("Banca Privada should be selected", contractBreakdownPage.isBankingSegmentActive("Banca Privada"));
    }

    @Then("the application should display correctly for Wealth Management in Landscape mode")
    public void theApplicationShouldDisplayCorrectlyForWealthManagementInLandscape() {
        assertTrue("Application should be in landscape orientation", contractBreakdownPage.isLandscapeMode());
        assertTrue("Wealth Management should be selected", contractBreakdownPage.isBankingSegmentActive("Wealth Management"));
    }

    @When("the user clicks on any part of the total contract value component")
    public void theUserClicksOnTotalContractValueComponent() {
        contractBreakdownPage.clickContractValueComponent();
    }

    @When("the user clicks on the total contract value component")
    public void theUserClicksOnTheContractValueComponent() {
        contractBreakdownPage.clickContractValueComponent();
    }

    @Then("the popup with contract value breakdown should be displayed")
    public void thePopupWithContractValueBreakdownShouldBeDisplayed() {
        assertTrue("Breakdown popup should be visible", contractBreakdownPage.isBreakdownPopupDisplayed());
    }

    @When("the user clicks outside the breakdown component")
    public void theUserClicksOutsideTheBreakdownComponent() {
        contractBreakdownPage.clickOutsideBreakdownPopup();
    }

    @Then("the popup should close correctly")
    public void thePopupShouldCloseCorrectly() {
        assertTrue("Breakdown popup should be closed", contractBreakdownPage.isBreakdownPopupClosed());
    }

    @When("the user changes to Responsive Portrait view for Banca Patrimonial")
    public void theUserChangesToPortraitViewForBancaPatrimonial() {
        contractBreakdownPage.setPortraitOrientation();
    }

    @When("the user changes to Responsive Portrait view for Banca Privada")
    public void theUserChangesToPortraitViewForBancaPrivada() {
        contractBreakdownPage.setPortraitOrientation();
    }

    @When("the user changes to Responsive Portrait view for Wealth Management")
    public void theUserChangesToPortraitViewForWealthManagement() {
        contractBreakdownPage.setPortraitOrientation();
    }

    @Then("the application should adapt correctly to Portrait mode")
    public void theApplicationShouldAdaptCorrectlyToPortraitMode() {
        assertTrue("Application should be in portrait orientation", contractBreakdownPage.isPortraitMode());
    }

    @Then("the popup should close correctly in all responsive views")
    public void thePopupShouldCloseCorrectlyInAllResponsiveViews() {
        assertTrue("Breakdown popup should be closed in all views", contractBreakdownPage.isBreakdownPopupClosed());
        driver.quit();
    }
}