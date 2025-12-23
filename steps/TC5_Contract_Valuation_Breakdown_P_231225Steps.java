package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.ContractValuationPage;
import pages.LoginPage;
import pages.AdvisorModulePage;
import org.junit.Assert;

public class ContractValuationSteps {
    private WebDriver driver;
    private LoginPage loginPage;
    private AdvisorModulePage advisorPage;
    private ContractValuationPage valuationPage;

    public ContractValuationSteps(WebDriver driver) {
        this.driver = driver;
        this.loginPage = new LoginPage(driver);
        this.advisorPage = new AdvisorModulePage(driver);
        this.valuationPage = new ContractValuationPage(driver);
    }

    @Given("the user is authenticated in Acticenter")
    public void theUserIsAuthenticatedInActicenter() {
        loginPage.navigateToActicenter();
        loginPage.performLogin();
    }

    @And("a contract is available for consultation")
    public void aContractIsAvailableForConsultation() {
        Assert.assertTrue(advisorPage.isContractAvailable());
    }

    @Given("the user accesses Acticenter from a device with responsive landscape view")
    public void theUserAccessesActicenterFromDeviceWithResponsiveLandscapeView() {
        valuationPage.setViewportToLandscape();
    }

    @When("the user selects a contract from the Advisor module in landscape view")
    public void theUserSelectsContractFromAdvisorModuleInLandscapeView() {
        advisorPage.selectContract();
    }

    @Then("the contract loads correctly in responsive landscape view")
    public void theContractLoadsCorrectlyInResponsiveLandscapeView() {
        Assert.assertTrue(valuationPage.isContractLoadedInLandscape());
    }

    @When("the user clicks on the total contract value component")
    public void theUserClicksOnTotalContractValueComponent() {
        valuationPage.clickTotalValueComponent();
    }

    @Then("the breakdown pop-up displays correctly showing all items in landscape view")
    public void theBreakdownPopupDisplaysCorrectlyShowingAllItemsInLandscapeView() {
        Assert.assertTrue(valuationPage.isPopupDisplayed());
        Assert.assertTrue(valuationPage.areAllBreakdownItemsVisible());
    }

    @When("the user clicks outside the pop-up on any screen area")
    public void theUserClicksOutsideThePopupOnAnyScreenArea() {
        valuationPage.clickOutsidePopup();
    }

    @Then("the pop-up closes properly")
    public void thePopupClosesProperly() {
        Assert.assertFalse(valuationPage.isPopupDisplayed());
    }

    @When("the user changes to responsive portrait view and selects the same contract")
    public void theUserChangesToResponsivePortraitViewAndSelectsSameContract() {
        valuationPage.setViewportToPortrait();
        advisorPage.selectContract();
    }

    @Then("the contract is displayed correctly in portrait mode")
    public void theContractIsDisplayedCorrectlyInPortraitMode() {
        Assert.assertTrue(valuationPage.isContractLoadedInPortrait());
    }

    @When("the user clicks on the total valuation component in portrait view")
    public void theUserClicksOnTotalValuationComponentInPortraitView() {
        valuationPage.clickTotalValueComponent();
    }

    @Then("the breakdown pop-up opens correctly showing the vertically aligned breakdown list in portrait mode")
    public void theBreakdownPopupOpensCorrectlyShowingVerticallyAlignedBreakdownListInPortraitMode() {
        Assert.assertTrue(valuationPage.isPopupDisplayed());
        Assert.assertTrue(valuationPage.isBreakdownVerticallyAligned());
    }

    @When("the user closes the pop-up by clicking outside the component in portrait view")
    public void theUserClosesThePopupByClickingOutsideComponentInPortraitView() {
        valuationPage.clickOutsidePopup();
    }

    @Then("the pop-up closes without errors in portrait mode")
    public void thePopupClosesWithoutErrorsInPortraitMode() {
        Assert.assertFalse(valuationPage.isPopupDisplayed());
    }

    @When("the user switches between landscape and portrait views multiple times and tests the pop-up open and close")
    public void theUserSwitchesBetweenLandscapeAndPortraitViewsMultipleTimesAndTestsPopupOpenAndClose() {
        valuationPage.testPopupAcrossMultipleViewportChanges();
    }

    @Then("the pop-up maintains its open and close functionality in all transitions between responsive views")
    public void thePopupMaintainsItsOpenAndCloseFunctionalityInAllTransitionsBetweenResponsiveViews() {
        Assert.assertTrue(valuationPage.isPopupFunctionalAcrossViewports());
    }

    @And("the breakdown remains vertically aligned with the component in all views")
    public void theBreakdownRemainsVerticallyAlignedWithComponentInAllViews() {
        Assert.assertTrue(valuationPage.isBreakdownAlignmentCorrectInAllViews());
    }
}